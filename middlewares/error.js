const handleErrors = (err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal server error" });
};

module.exports = handleErrors;