const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const commentController = {};

commentController.addComment = async (req, res, next) => {
  try {
    //   const userId = req.user.id;
    const userId = "1"; // for testing
    const { postId, content, parentId } = req.body;

    // already validate by zod

    // import into database
    const comment = await prisma.comment.create({
      data: {
        postId: Number(postId),
        userId: Number(userId),
        content,
        parentId: Number(parentId) || null,
      },
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

commentController.updateComment = async (req, res, next) => {
  try {
    //   const userId = req.user.id;
    const userId = "1"; // for testing only
    const { commentId } = req.params;
    const { content } = req.body;

    // console.log("***", content)

    // validate
    if (!commentId) {
      return createError(400, "Comment id is required");
    }

    if (!userId) {
      return createError(400, "User id is required");
    }

    if (!content) {
      return createError(400, "Content is required");
    }

    if (isNaN(commentId)) {
      return createError(400, "Comment id should be number");
    }

    if (isNaN(userId)) {
      return createError(400, "User id should be number");
    }

    if (typeof content !== "string") {
      return createError(400, "Content should be string");
    }

    // find comment
    const isExist = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
        userId: Number(userId),
      },
    });

    if (!isExist) {
      return createError(400, "the comment does not exist or permission deny");
    }

    // insert into database

    const comment = await prisma.comment.update({
      where: {
        id: Number(commentId),
        userId: Number(userId),
      },
      data: {
        content,
      },
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

commentController.deleteComment = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const userId = 1;
    const { commentId } = req.params;

    // validate
    if (!commentId) {
      return createError(400, "Comment id is required");
    }

    if (!userId) {
      return createError(400, "User id is required");
    }

    if (isNaN(commentId)) {
      return createError(400, "Comment id should be number");
    }

    if (isNaN(userId)) {
      return createError(400, "User id should be number");
    }

    // find comment
    const isExist = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
        userId: Number(userId),
      },
    });

    if (!isExist) {
      return createError(400, "the comment does not exist or permission deny");
    }

    // insert into database

    const comment = await prisma.comment.delete({
      where: {
        id: Number(commentId),
        userId: Number(userId),
      },
    });

    // response
    res.json({ message: `comment id: ${commentId} has been deleted.` });
  } catch (error) {
    next(error);
  }
};

commentController.getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // validate
    if (!postId) {
      return createError(400, "post id is required");
    }

    if (isNaN(postId)) {
      return createError(400, "post id should be number");
    }

    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId), parentId: null },
      include: {
        user: { select: { username: true } },
        children: {
          include: { user: { select: { username: true } } },
        },
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = commentController;
