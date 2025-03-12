const authController = {};

authController.register = (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return createError(400, "Username is required");
    }
    if (!email) {
      return createError(400, "Email is required");
    }
    if (!password) {
      return createError(400, "Password is required");
    }
    res.json({ message: "Register successful" });
  } catch (error) {
    next(error);
  }
};

authController.login = (req, res, next) => {
  try {
    res.json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
