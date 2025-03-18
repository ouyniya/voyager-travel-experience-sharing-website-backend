const express = require("express");
const profileController = require("../controllers/profile-controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload-profile");

router.get("/:userId", profileController.getUserInfoByUserId)
router.put("/profile-info", authenticate, profileController.updateProfileInfo);
router.put("/profile-image", authenticate, upload.single("profileImage"), profileController.updateProfileImage);

module.exports = router;
