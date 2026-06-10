const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { generateOTP } = require('../utils/generateOTP');
const { sendEmailOTP } = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Store pending registrations (in-memory, use Redis in production)
const pendingUsers = new Map();

// @route   POST /api/auth/register
// @desc    Step 1: Submit registration details + password, send OTP
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, phone, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email already exists and verified
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if username exists
    if (username) {
      const usernameExists = await User.findOne({ username: username.toLowerCase() });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Check if phone exists
    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
    }

    // Generate OTP and store pending user data
    const otp = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    pendingUsers.set(email.toLowerCase(), {
      name,
      username: username ? username.toLowerCase() : undefined,
      email: email.toLowerCase(),
      phone: phone || undefined,
      password,
      otp,
      otpExpire
    });

    // Send OTP to email
    try {
      await sendEmailOTP(email, otp, name);
      console.log('OTP email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError.message);
      pendingUsers.delete(email.toLowerCase());
      return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }

    res.json({ message: 'Verification code sent to your email', email: email.toLowerCase() });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Step 2: Verify OTP, create account with password
// @access  Public
router.post('/verify-email', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const pending = pendingUsers.get(email.toLowerCase());
    if (!pending) {
      return res.status(400).json({ message: 'Registration expired. Please start over.' });
    }

    // Check OTP
    if (pending.otp !== otp) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Check expiry
    if (Date.now() > pending.otpExpire) {
      pendingUsers.delete(email.toLowerCase());
      return res.status(400).json({ message: 'Verification code expired. Please register again.' });
    }

    // Create verified user with password
    const user = await User.create({
      name: pending.name,
      username: pending.username,
      email: pending.email,
      phone: pending.phone,
      password: pending.password,
      isVerified: true
    });

    // Clean up pending
    pendingUsers.delete(email.toLowerCase());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Verify error:', error.message);
    res.status(500).json({ message: error.message || 'Verification failed' });
  }
});

// @route   POST /api/auth/resend-otp
// @desc    Resend OTP for pending registration
// @access  Public
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const pending = pendingUsers.get(email.toLowerCase());

    if (!pending) {
      return res.status(400).json({ message: 'Registration expired. Please start over.' });
    }

    const otp = generateOTP();
    pending.otp = otp;
    pending.otpExpire = Date.now() + 10 * 60 * 1000;

    try {
      await sendEmailOTP(email, otp, pending.name);
      console.log('Resent OTP to:', email);
    } catch (emailError) {
      console.error('Failed to resend OTP:', emailError.message);
      return res.status(500).json({ message: 'Failed to resend code. Please try again.' });
    }

    res.json({ message: 'New code sent to your email' });

  } catch (error) {
    console.error('Resend error:', error.message);
    res.status(500).json({ message: error.message || 'Failed to resend code' });
  }
});

// @route   POST /api/auth/login
// @desc    Login with email OR username OR phone + password
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: 'Please enter your login ID and password' });
    }

    // Try to find user by email, username, or phone
    const user = await User.findOne({
      $or: [
        { email: loginId.toLowerCase() },
        { username: loginId.toLowerCase() },
        { phone: loginId }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Account not verified. Please complete registration.' });
    }

    if (await user.comparePassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;