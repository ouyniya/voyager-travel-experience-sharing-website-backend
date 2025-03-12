const authController = {};
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      return createError(400, "Email is already used");
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

    // response to frontend >> register success
    res.json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
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
      return createError(400, "Email or password is invalid");
    }

    // check password valid
    const isPasswordValid = await bcrypt.compare(password, profile.password);

    if (!isPasswordValid) {
      return createError(400, "Password is invalid");
    }

    // generate token
    const user = {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      role: profile.role,
      profileImage: profile.profileImage
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

// authController.currentUser = async (req, res, next) => {
//   try {
//     res.json({ message: "Hello current user" });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = authController;
