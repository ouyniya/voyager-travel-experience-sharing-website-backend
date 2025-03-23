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
    // Fetch total views for each place
    const placeViews = await prisma.post.groupBy({
      by: ["placeId"],
      _sum: { view: true },
      where: { placeId: { not: null } },
    });

    // Sort places by total views in descending order and limit to top 10
    const sortedTopPlaces = placeViews
      .sort((a, b) => (b._sum.view || 0) - (a._sum.view || 0))
      .slice(0, 10);

    const placeIds = sortedTopPlaces.map((p) => p.placeId);

    // Fetch place details with province and district
    const places = await prisma.place.findMany({
      where: { id: { in: placeIds } },
      select: {
        id: true,
        name: true,
        district: {
          select: {
            id: true,
            name: true,
            province: { select: { id: true, name: true } },
          },
        },
      },
    });

    // Construct place results
    const topPlacesResult = sortedTopPlaces.map((p) => {
      const place = places.find((place) => place.id === p.placeId);
      return {
        id: p.placeId,
        name: place?.name || "Unknown",
        totalViews: p._sum.view || 0,
        district: place?.district?.name || "Unknown",
        province: place?.district?.province?.name || "Unknown",
      };
    });

    // Group views by province
    const provinceViews = await prisma.post.groupBy({
      by: ["placeId"],
      _sum: { view: true },
      where: { placeId: { not: null } },
    });

    // Fetch province details
    const provinceData = await prisma.place.findMany({
      where: { id: { in: provinceViews.map((p) => p.placeId) } },
      select: { id: true, provinceId: true },
    });

    const provinces = await prisma.province.findMany({
      where: { id: { in: provinceData.map((p) => p.provinceId) } },
      select: { id: true, name: true },
    });

    // Aggregate views by province
    const provinceTotals = {};
    provinceViews.forEach((p) => {
      const provinceId = provinceData.find(
        (pl) => pl.id === p.placeId
      )?.provinceId;
      if (provinceId) {
        provinceTotals[provinceId] =
          (provinceTotals[provinceId] || 0) + (p._sum.view || 0);
      }
    });

    // Sort provinces by views (desc)
    const topProvinces = Object.keys(provinceTotals)
      .map((id) => ({
        id: Number(id),
        name:
          provinces.find((prov) => prov.id === Number(id))?.name || "Unknown",
        totalViews: provinceTotals[id],
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    // Group views by district
    const districtViews = await prisma.post.groupBy({
      by: ["placeId"],
      _sum: { view: true },
      where: { placeId: { not: null } },
    });

    // Fetch district details
    const districtData = await prisma.place.findMany({
      where: { id: { in: districtViews.map((d) => d.placeId) } },
      select: { id: true, districtId: true },
    });

    const districts = await prisma.district.findMany({
      where: { id: { in: districtData.map((d) => d.districtId) } },
      select: { id: true, name: true },
    });

    // Aggregate views by district
    const districtTotals = {};
    districtViews.forEach((d) => {
      const districtId = districtData.find(
        (pl) => pl.id === d.placeId
      )?.districtId;
      if (districtId) {
        districtTotals[districtId] =
          (districtTotals[districtId] || 0) + (d._sum.view || 0);
      }
    });

    // Sort districts by views (desc)
    const topDistricts = Object.keys(districtTotals)
      .map((id) => ({
        id: Number(id),
        name:
          districts.find((dist) => dist.id === Number(id))?.name || "Unknown",
        totalViews: districtTotals[id],
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    res.json({ topPlaces: topPlacesResult, topProvinces, topDistricts });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTopProvinces = async (req, res, next) => {
  // console.log("*********");     
  try {
    // Fetch total views for each place
    const placeViews = await prisma.post.groupBy({
      by: ["placeId"],
      _sum: { view: true },
      where: { placeId: { not: null } },
    });

    // Sort and limit to top 10 places
    const sortedTopPlaces = placeViews
      .sort((a, b) => (b._sum.view || 0) - (a._sum.view || 0))
      .slice(0, 10);

    const placeIds = sortedTopPlaces.map((p) => p.placeId);

    // Fetch place details with province and district
    const places = await prisma.place.findMany({
      where: { id: { in: placeIds } },
      select: {
        id: true,
        name: true,
        district: {
          select: {
            id: true,
            name: true,
            province: { select: { id: true, name: true } },
          },
        },
      },
    });

    // Fetch images for places
    const placeImages = await prisma.postImage.findMany({
      where: { postId: { in: placeIds } },
      select: { postId: true, url: true },
      orderBy: { postId: "asc" },
      distinct: ["postId"],
    });

    // Construct place results
    const topPlacesResult = sortedTopPlaces.map((p) => {
      const place = places.find((place) => place.id === p.placeId);
      return {
        id: p.placeId,
        name: place?.name || "Unknown",
        totalViews: p._sum.view || 0,
        district: place?.district?.name || "Unknown",
        province: place?.district?.province?.name || "Unknown",
        imageUrl:
          placeImages.find((img) => img.postId === p.placeId)?.url || null,
      };
    });

    // Fetch and aggregate views by province
    const provinceData = await prisma.place.findMany({
      where: { id: { in: placeViews.map((p) => p.placeId) } },
      select: { id: true, provinceId: true },
    });

    const provinceTotals = {};
    placeViews.forEach((p) => {
      const provinceId = provinceData.find(
        (pl) => pl.id === p.placeId
      )?.provinceId;
      if (provinceId) {
        provinceTotals[provinceId] =
          (provinceTotals[provinceId] || 0) + (p._sum.view || 0);
      }
    });

    const provinces = await prisma.province.findMany({
      where: { id: { in: Object.keys(provinceTotals).map(Number) } },
      select: { id: true, name: true },
    });

    // Fetch images for provinces
    const provinceImages = await prisma.postImage.findMany({
      where: { postId: { in: Object.keys(provinceTotals).map(Number) } },
      select: { postId: true, url: true },
      orderBy: { postId: "asc" },
      distinct: ["postId"],
    });

    const topProvinces = Object.keys(provinceTotals)
      .map((id) => ({
        id: Number(id),
        name:
          provinces.find((prov) => prov.id === Number(id))?.name || "Unknown",
        totalViews: provinceTotals[id],
        imageUrl:
          provinceImages.find((img) => img.postId === Number(id))?.url || null,
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    // Fetch and aggregate views by district
    const districtData = await prisma.place.findMany({
      where: { id: { in: placeViews.map((p) => p.placeId) } },
      select: { id: true, districtId: true },
    });

    const districtTotals = {};
    placeViews.forEach((p) => {
      const districtId = districtData.find(
        (pl) => pl.id === p.placeId
      )?.districtId;
      if (districtId) {
        districtTotals[districtId] =
          (districtTotals[districtId] || 0) + (p._sum.view || 0);
      }
    });

    const districts = await prisma.district.findMany({
      where: { id: { in: Object.keys(districtTotals).map(Number) } },
      select: { id: true, name: true },
    });

    // Fetch images for districts
    const districtImages = await prisma.postImage.findMany({
      where: { postId: { in: Object.keys(districtTotals).map(Number) } },
      select: { postId: true, url: true },
      orderBy: { postId: "asc" },
      distinct: ["postId"],
    });

    const topDistricts = Object.keys(districtTotals)
      .map((id) => ({
        id: Number(id),
        name:
          districts.find((dist) => dist.id === Number(id))?.name || "Unknown",
        totalViews: districtTotals[id],
        imageUrl:
          districtImages.find((img) => img.postId === Number(id))?.url || null,
      }))
      .sort((a, b) => b.totalViews - a.totalViews);

    res.json({ topPlaces: topPlacesResult, topProvinces, topDistricts });
  } catch (error) {
    next(error);
  }
};

module.exports = trackViewController;
