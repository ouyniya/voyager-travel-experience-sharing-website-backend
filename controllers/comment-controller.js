const commentController = {};

commentController.addComment = (req, res, next) => {
    try {
        res.json({ message: "comment successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = commentController;