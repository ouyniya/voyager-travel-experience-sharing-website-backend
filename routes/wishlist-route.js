const express = require("express");
const wishlistController = require("../controllers/wishlist-controller");
const authenticate = require("../middlewares/authenticate");
const wishlistRoute = express.Router();

wishlistRoute.post("/", authenticate, wishlistController.createWishlist);
wishlistRoute.delete("/:wishlistId", authenticate, wishlistController.deleteWishlist);
wishlistRoute.delete("/post/:postId", authenticate, wishlistController.deleteWishlistByPostId);
wishlistRoute.get("/", authenticate, wishlistController.getAllWishlists);
wishlistRoute.get("/user/:userId", authenticate, wishlistController.getWishlistByUserId);

module.exports = wishlistRoute;
