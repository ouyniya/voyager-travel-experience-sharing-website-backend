const express = require("express")
const {createWishlist,getAllWishlists, getWishlistByUserId, getWishlistById} = require("../controllers/wishlist-controller");
const authenticate = require("../middlewares/authenticate");
const wishlistRoute = express.Router();

wishlistRoute.post('/',authenticate, createWishlist);
wishlistRoute.get('/',authenticate, getAllWishlists);
wishlistRoute.get('/user/:userId',authenticate, getWishlistByUserId);


module.exports = wishlistRoute