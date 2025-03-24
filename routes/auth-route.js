const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();
const {
  validationZod,
  loginSchema,
  registerSchema,
} = require("../middlewares/validators");
const authenticate = require("../middlewares/authenticate");

router.post(
  "/register",
  validationZod(registerSchema),
  authController.register
);

router.post("/login-less-secure", validationZod(loginSchema), authController.loginLessSecure);
router.post("/login", validationZod(loginSchema), authController.login);
router.get("/current-user", authenticate, authController.currentUser);

// OTP routes
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);


module.exports = router;
