const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailOTP = async (toEmail, otp, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'Your Smart Solution Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #f8faff; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #f07d00; margin: 0;">SMART SOLUTION</h2>
          <p style="color: #6b7a99; font-size: 12px; margin: 4px 0 0;">ELECTRICAL TRADING & PROJECTS</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 24px;">
          <h3 style="color: #0a1628; margin-top: 0;">Hello ${name || 'there'},</h3>
          <p style="color: #6b7a99; line-height: 1.6;">Your verification code is:</p>
          <div style="background: #0a1628; color: #f07d00; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 10px; letter-spacing: 8px; margin: 16px 0;">
            ${otp}
          </div>
          <p style="color: #6b7a99; font-size: 13px; line-height: 1.6;">This code will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
          <p style="color: #6b7a99; font-size: 12px; margin-top: 20px; border-top: 1px solid #e4eaf5; padding-top: 16px;">If you didn't request this code, please ignore this email.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailOTP };
