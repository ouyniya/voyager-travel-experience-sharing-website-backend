const express = require("express");
const postController = require("../controllers/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/",authenticate, upload.array("images",10), postController.createPost);
router.get("/posts", ()=>{})
router.get("/posts/:userId", ()=>{})
router.get("/posts/:id", ()=>{})


module.exports = router;
