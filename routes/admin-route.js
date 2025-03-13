const express = require("express")
// const { authCheckToken } = require("../middlewares/auth-middleware")
const adminController = require("../controllers/admin-controller")
const adminRoute = express.Router()

adminRoute.get("/users", adminController.listUsers)
adminRoute.patch("/users", adminController.updateRole)
adminRoute.get("/posts", adminController.listPosts)
adminRoute.get("/users/:id/posts", adminController.currentPost)
adminRoute.delete("/posts/:id", adminController.deletePost)




module.exports = adminRoute