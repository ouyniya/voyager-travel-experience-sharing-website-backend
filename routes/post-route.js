const express = require("express");
const postController = require("../controllers/post-controller");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/", upload.array("images", 10), postController.createPost);

module.exports = router;
