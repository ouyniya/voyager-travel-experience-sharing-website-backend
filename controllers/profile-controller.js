const cloudinary = require("../configs/cloudinary")
const fs = require("fs/promises");
const prisma = require("../configs/prisma");

const profileController = {};

profileController.createPost = async (req, res, next) => {
    try {
        

        res.json(profile)
    } catch (error) {
        next(error);
    }
};

module.exports = profileController;