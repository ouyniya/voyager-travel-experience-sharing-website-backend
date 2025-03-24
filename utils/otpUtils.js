const crypto = require('crypto');

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a hash of the OTP to store in session/database
const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

module.exports = { generateOTP, hashOTP };