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

trackViewController.getAllTrackViews = async (req, res, next) => {
  try {
    // Sum total views from the database
    const trackViews = await prisma.view.aggregate({
      _sum: {
        views: true,
      },
    });

    // Handle case where no views exist
    if (!trackViews || trackViews._sum.views === null) {
      return res.status(400).json({ message: "No track views recorded" });
    }

    // Response
    res.json({ totalViews: trackViews._sum.views });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // sum track view from db
    const trackViews = await prisma.view.groupBy({
      by: ["postId"],
      _sum: {
        views: true,
      },
      where: {
        postId: Number(postId),
      },
    });

    if (!trackViews) {
      return createError(400, "No track views recorded");
    }

    // format
    // postId, totalView
    let trackViewData = [];
    trackViews.forEach((trackView) => {
      trackViewData.push({
        postId: trackView.postId,
        views: trackView._sum.views,
      });
    });

    // response
    res.json(trackViewData);
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPlaceId = async (req, res, next) => {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      return createError(400, "placeId is required");
    }

    const placeIdNum = Number(placeId);
    if (isNaN(placeIdNum)) {
      return createError(400, "Invalid placeId");
    }

    // Aggregate total views for posts linked to the given placeId
    const totalViews = await prisma.view.aggregate({
      _sum: {
        views: true,
      },
      where: {
        post: {
          placeId: placeIdNum,
        },
      },
    });

    res.json({
      message: "get Track Views By Place Id successful",
      totalViews: totalViews._sum.views || 0,
    });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPlace = async (req, res, next) => {
  try {
    // Fetch the total views for each place
    const topPlaces = await prisma.post.groupBy({
      by: ["placeId"],
      _sum: {
        view: true,
      },
      where: {
        placeId: { not: null }, // Exclude posts without a place
      },
    });

    // Manually sort by total views in descending order
    const sortedTopPlaces = topPlaces
      .sort((a, b) => (b._sum.view || 0) - (a._sum.view || 0)) // Ensure no undefined values
      .slice(0, 10); // Limit to top 10 after sorting

    const placeIds = sortedTopPlaces.map((p) => p.placeId);

    // Fetch place details, ensuring order preservation
    const places = await prisma.place.findMany({
      where: { id: { in: placeIds } },
      select: { id: true, name: true },
    });

    // Ensure response maintains sorting
    const result = sortedTopPlaces.map((p) => ({
      id: p.placeId,
      name: places.find((place) => place.id === p.placeId)?.name || "Unknown",
      totalViews: p._sum.view || 0,
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = trackViewController;
