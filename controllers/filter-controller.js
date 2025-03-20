const createError = require("../utils/createError");
const prisma = require("../configs/prisma");

const filterController = {};

// GET /api/filter?page=1&limit=10
filterController.getFilterPosts = async (req, res, next) => {
  try {
    const { placeName, province, district, page = 1, limit = 12 } = req.query;

    // Ensure page and limit are numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1) {
      return next(createError(400, "Page must be a positive number"));
    }
    if (isNaN(limitNum) || limitNum < 1) {
      return next(createError(400, "Limit must be a positive number"));
    }

    // Build filters dynamically
    const filters = {};

    if (placeName) {
      filters.place = {
        name: { contains: placeName.trim() },
      };
    }

    if (province) {
      filters.place = {
        ...filters.place,
        province: {
          name: { contains: province.trim() },
        },
      };
    }

    if (district) {
      filters.place = {
        ...filters.place,
        district: {
          name: { contains: district.trim() },
        },
      };
    }

    console.log(filters);

    // Fetch total count for pagination
    const totalPosts = await prisma.post.count({ where: filters });

    // Fetch paginated posts including the first image
    const posts = await prisma.post.findMany({
      where: filters,
      include: {
        place: {
          include: {
            province: true,
            district: true,
          },
        },
        images: {
          take: 1, // Get only the first image
        },
      },
      take: limitNum, // Limit per page
      skip: (pageNum - 1) * limitNum, // Offset
      orderBy: { createdAt: "desc" }, // Sort by newest
    });

    // Map posts to add the first image URL as a field
    const postsWithFirstImage = posts.map((post) => ({
      ...post,
      firstImage: post.images.length > 0 ? post.images[0].url : null, // Add first image URL
    }));

    // Return paginated response
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      posts: postsWithFirstImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = filterController;
