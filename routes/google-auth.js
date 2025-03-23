const express = require("express");
const router = express.Router();
const passport = require("passport");
const createError = require("../utils/createError");

router.get("/login/success", (req, res, next) => {
    // console.log("****", req.user)
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully login",
      user: {
        id: req.user.id,
        role: "USER",
        googleId: req.user.googleId,
        username: req.user.username,
        email: req.user.email,
        profileImage: req.user.profileImage,
        isGoogleUser: req.user.isGoogleUser 
      },
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
    successRedirect: `${process.env.GOOGLE_CLIENT_URL}/home`,
    failureRedirect: `${process.env.GOOGLE_CLIENT_URL}/login`,
  })
);

  router.get("/logout", (req, res) => {
    console.log("Logout requested by:", req.user);
    req.logout((err) => {
      if (err) return res.status(500).json({ error: true, message: "Logout failed" });
  
      req.session.destroy(() => {
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          secure: false, // Set to true if using HTTPS
          sameSite: "None", // Important for cross-origin cookies
        });
  
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });

module.exports = router;
