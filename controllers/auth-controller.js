const authController = {};

authController.register = (req, res, next) => {
    try {
        res.json({ message: "Register successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = authController;