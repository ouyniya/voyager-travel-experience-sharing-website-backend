const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

const trackViewController = {};

trackViewController.trackView = async (req, res, next) => {
  const { postId, token } = req.body;

  try {
    // validate
    if (!token) {
      return createError(400, "Token is required");
    }

    if (!postId) {
      return createError(400, "Post id is required");
    }

    if (isNaN(postId)) {
      return createError(400, "Post id should be number");
    }

    if (typeof token !== "string") {
      return createError(400, "Token should be string");
    }

    // ค้นหา record ของ pageId และ token
    const viewRecord = await prisma.view.findFirst({
      where: {
        postId: Number(postId),
        token: token,
      },
    });

    if (!viewRecord) {
      // ถ้ายังไม่มี record สำหรับ pageId และ token นี้
      await prisma.view.create({
        data: {
          token: token,
          postId: Number(postId),
          views: 1,
        },
      });

      // เพิ่มจำนวน view ใน page
      await prisma.post.update({
        where: { id: Number(postId) },
        data: { view: { increment: 1 } },
      });
    }

    // response
    res.json({ message: "View recorded" });
  } catch (error) {
    next(error);
  }
};

trackViewController.getAllTrackViews = (req, res, next) => {
  try {
    res.json({ message: "getAllTrackViews successful" });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPostId = (req, res, next) => {
  try {
    res.json({ message: "getTrackViewsByPostId successful" });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPlaceId = (req, res, next) => {
  try {
    res.json({ message: "getTrackViewsByPlaceId successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = trackViewController;
