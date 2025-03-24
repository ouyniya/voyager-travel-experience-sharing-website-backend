const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }

  // host: 'live.smtp.mailtrap.io',
  // port: 587,
  // secure: false, // use SSL
  // auth: {
  //   user: '1a2b3c4d5e6f7g',
  //   pass: '1a2b3c4d5e6f7g',
  // }

  // service: 'hotmail',
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASSWORD
  // }

  // host: 'smtp.office365.com',  // Hotmail/Outlook SMTP server
  // port: 587,
  // secure: false, // Use TLS
  // auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASSWORD
  // },
  // tls: {
  //     ciphers: 'SSLv3'
  // }


  // host: 'smtp.resend.com',
  // secure: true,
  // port: 465,
  // auth: {
  //   user: 'resend',
  //   pass: process.env.EMAIL_PASSWORD
  // },
});

const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Login Verification</h2>
          <p>Your one-time password (OTP) is:</p>
          <h1 style="color: #4A90E2; letter-spacing: 2px; font-size: 32px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendOTPEmail };