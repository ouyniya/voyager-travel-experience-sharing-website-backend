const express = require("express")
// const { authCheckToken } = require("../middlewares/auth-middleware")
const adminController = require("../controllers/admin-controller")
const authenticate = require("../middlewares/authenticate")
const adminRoute = express.Router()


adminRoute.get("/users",authenticate, adminController.listUsers)
adminRoute.patch("/users",authenticate, adminController.updateRole)
adminRoute.get("/posts",authenticate, adminController.listPosts)
adminRoute.get("/users/:id/posts",authenticate, adminController.currentPost)
adminRoute.delete("/posts/:id",authenticate, adminController.deletePost)
adminRoute.delete("/users/:id",authenticate, adminController.deleteUser)




module.exports = adminRoute