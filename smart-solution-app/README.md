# Smart Solution Electrical - Full Stack MERN App

## Authentication

- **Register:** Full name, username, email, phone, password, confirm password → Email OTP verification → Account created
- **Login:** Email, username, OR phone number + password
- **Security:** JWT tokens, verified accounts only

---

## Project Structure

```
smart-solution-app/
├── backend/
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js            # Register + OTP + Login
│   │   ├── messages.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── generateOTP.js     # 6-digit code
│   │   └── sendEmail.js       # Nodemailer
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── LoginPage.js     # Email/username/phone + password
    │   │   └── RegisterPage.js  # All fields + OTP verify
    │   └── ...
    └── package.json
```

---

## Setup

### 1. Install

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Configure `.env` in `backend/`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartsolution
JWT_SECRET=your_super_secret_key
NODE_ENV=development

# Gmail App Password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=Smart Solution <your_email@gmail.com>
```

**Get Gmail App Password:**
1. Google Account → Security → 2-Step Verification (enable)
2. Security → App Passwords → Mail → Other → "Smart Solution"
3. Copy 16-char password into `EMAIL_PASS`

### 3. Start

```bash
npm run dev   # from root folder
```

---

## Registration Flow

```
Step 1: Fill form
  - Full Name (required)
  - Username (optional)
  - Email (required)
  - Phone (optional)
  - Password (required, min 6 chars)
  - Confirm Password (required)
  → Click "Create Account & Verify Email"
  → 6-digit OTP sent to email

Step 2: Enter OTP
  - Type 6-digit code from email
  → Click "Verify & Complete Registration"
  → Auto-login, redirect to dashboard
```

## Login Flow

```
Enter: Email OR Username OR Phone Number
       + Password
→ JWT stored in localStorage
→ Redirect to dashboard (user) or admin panel
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Submit details, send OTP |
| POST | `/api/auth/verify-email` | Verify OTP, create account |
| POST | `/api/auth/resend-otp` | Resend OTP |
| POST | `/api/auth/login` | Login with any ID |
| GET | `/api/auth/me` | Get current user |

---

## Making an Admin

1. Register via app
2. MongoDB Compass → `users` collection
3. Change `role` from `"user"` to `"admin"`
4. Log out and back in
