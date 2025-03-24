const authController = {};
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP, hashOTP } = require('../utils/otpUtils');
const { sendOTPEmail } = require('../utils/emailService');

authController.register = async (req, res, next) => {
  // If the user provides an email, use the part before @ as the username.
  const generateUsernameFromEmail = (email) => {
    return email.split("@")[0];
  };

  try {
    // req body
    const { username, email, password } = req.body;

    // already validated by Zod

    // check email (user) exist
    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return createError(400, "User already exists");
    }

    // Generate username from Email
    const usernameFromEmail = username || generateUsernameFromEmail(email);

    // encrypt using 'bcrypt'
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // insert into db
    const user = await prisma.user.create({
      data: {
        email,
        username: usernameFromEmail,
        password: hashedPassword,
      },
    });

    // Login the user after successful sign-up
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        error: false,
        message: "Successfully signed up",
        user: user,
      });
    });

    // response to frontend >> register success
    // res.json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

authController.loginLessSecure = async (req, res, next) => {
  try {
    // req.body
    const { email, password } = req.body;

    // check email and password
    const profile = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!profile) {
      return createError(404, "User not found");
    }

    // Check if the user is a local user (not Google)
    if (!profile.isGoogleUser) {
      const isPasswordValid = await bcrypt.compare(password, profile.password);
      if (!isPasswordValid) {
        return createError(400, "Invalid password");
      }
    }

    // generate token
    const user = {
      id: profile.id,
      googleId: profile.googleId,
      email: profile.email,
      username: profile.username,
      role: profile.role,
      profileImage: profile.profileImage,
      isGoogleUser: profile.isGoogleUser,
    };

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // response
    res.json({ message: "User login successfully", user, token });
  } catch (error) {
    next(error);
  }
};



authController.currentUser = async (req, res, next) => {
  try {
    // console.log(req.user)

    const { email } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true,
        isGoogleUser: true,
      },
    });

    // console.log(profile)

    res.json({ user });
  } catch (error) {
    next(error);
  }
};


// Update the login function to send OTP
authController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check email and password
    const profile = await prisma.user.findFirst({
      where: { email },
    });

    if (!profile) {
      return createError(404, "User not found");
    }

    // Check if the user is a local user (not Google)
    if (!profile.isGoogleUser) {
      const isPasswordValid = await bcrypt.compare(password, profile.password);
      if (!isPasswordValid) {
        return createError(400, "Invalid password");
      }
    }

    // Generate and store OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    // Update user with OTP details
    await prisma.user.update({
      where: { id: profile.id },
      data: {
        otpHash,
        otpExpiry,
        otpVerified: false
      }
    });

    // Send OTP to user's email
    const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
      return createError(500, "Failed to send OTP. Please try again.");
    }

    // Return user data without token (will provide token after OTP verification)
    res.json({ 
      message: "OTP sent to your email", 
      userId: profile.id,
      email: profile.email,
      requiresOTP: true
    });
    
  } catch (error) {
    next(error);
  }
};

// Add OTP verification endpoint
authController.verifyOTP = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return createError(404, "User not found");
    }
    
    // Check if OTP has expired
    if (user.otpExpiry < new Date()) {
      return createError(400, "OTP has expired. Please request a new one.");
    }
    
    // Verify OTP hash
    const otpHash = hashOTP(otp);
    if (otpHash !== user.otpHash) {
      return createError(400, "Invalid OTP. Please try again.");
    }
    
    // Mark OTP as verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        otpVerified: true,
        otpHash: null,
        otpExpiry: null
      }
    });
    
    // Generate token
    const userData = {
      id: user.id,
      googleId: user.googleId,
      email: user.email,
      username: user.username,
      role: user.role,
      profileImage: user.profileImage,
      isGoogleUser: user.isGoogleUser,
    };
    
    const token = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    
    // Response
    res.json({ 
      message: "Login successful", 
      user: userData, 
      token 
    });
    
  } catch (error) {
    next(error);
  }
};

// Add resend OTP endpoint
authController.resendOTP = async (req, res, next) => {
  try {
    const { userId } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return createError(404, "User not found");
    }
    
    // Generate and store new OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    // Update user with new OTP details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpHash,
        otpExpiry,
        otpVerified: false
      }
    });
    
    // Send OTP to user's email
    const emailSent = await sendOTPEmail(user.email, otp);
    
    if (!emailSent) {
      return createError(500, "Failed to send OTP. Please try again.");
    }
    
    // Response
    res.json({ message: "New OTP sent to your email" });
    
  } catch (error) {
    next(error);
  }
};


module.exports = authController;
