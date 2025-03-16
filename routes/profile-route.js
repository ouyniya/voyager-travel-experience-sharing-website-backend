const express = require("express");
const profileController = require("../controllers/profile-controller.js");
const router = express.Router();
const authenticate = require("../");

router.put("/profile-info", authenticate, profileController, updateProfileInfo);
router.put("/profile-image", authenticate, profileController.updateProfileImage);

module.exports = router;
