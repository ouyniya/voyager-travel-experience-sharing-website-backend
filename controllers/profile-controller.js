const cloudinary = require("../configs/cloudinary");
const fs = require("fs");
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

const profileController = {};

profileController.updateProfileInfo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username, email } = req.body;

    // validate
    if (!username.trim() || !email.trim()) {
      return createError(400, "Username or email is required.");
    }

    if (typeof email !== "string") {
      return createError(400, "Email should be string.");
    }

    if (typeof username !== "string") {
      return createError(400, "Username should be string.");
    }

    // Check if profile exist ?
    const isExist = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    if (!isExist) {
      return createError(404, "User not found.");
    }

    // update profile
    const user = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        username,
        email,
      },
      omit: {
        password: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

profileController.updateProfileImage = async (req, res, next) => {
  try {
    const image = req.file
      ? await cloudinary.uploader.upload(req.file.path)
      : null;

    console.log("*****", image?.secure_url)

    const user = await prisma.user.update({
      where: {
        id: +req.user.id,
      },
      data: {
        profileImage: image?.secure_url,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

module.exports = profileController;
