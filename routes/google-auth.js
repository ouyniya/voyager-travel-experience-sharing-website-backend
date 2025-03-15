const express = require("express");
const router = express.Router();
const passport = require("passport");
const createError = require("../utils/createError");

router.get("/login/success", (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully login",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res, next) => {
  res.status(401).json({
    error: true,
    message: "Login error",
  });
});

// Google login callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect(process.env.GOOGLE_CLIENT_URL);
    });
  });

module.exports = router;
