const express = require("express");
const postController = require("../controllers/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const { validationZod, createPostSchema } = require("../middlewares/validators");
const router = express.Router();

router.post("/", authenticate, upload.array("images",10), postController.createPost);
router.get("/", postController.getAllPosts)
router.get("/:userId", postController.getPostFromUserId)
router.get("/each-posts/:id", postController.getPostFromPostId)
router.put("/:id",authenticate , postController.updatePost)
router.delete("/:id",authenticate , postController.deletePost)


module.exports = router;
