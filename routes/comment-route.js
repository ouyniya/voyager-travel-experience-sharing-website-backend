const express = require("express");
const commentController = require("../controllers/comment-controller");
const { validationZod, commentSchema } = require("../middlewares/validators");
const authenticate = require("../middlewares/authenticate")
const router = express.Router();

router.get("/:postId", commentController.getPostComments); // Get Comments by Post (no authenticate function)
router.post("/", authenticate, validationZod(commentSchema), commentController.addComment); // Create Comment
router.put("/:commentId", authenticate, commentController.updateComment); // Update Comment
router.delete("/:commentId", authenticate, commentController.deleteComment); // Delete Comment

module.exports = router;