const express = require("express");
const commentController = require("../controllers/comment-controller");
const router = express.Router();

router.post("/comments", commentController.addComment);

module.exports = router;