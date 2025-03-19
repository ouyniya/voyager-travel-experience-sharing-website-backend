const createError = require("../utils/createError");
const prisma = require("../configs/prisma");

const filterController = {};

// GET /api/posts/filter?page=1&limit=10
filterController.getFilterPosts = async (req, res, next) => {
  try {
    const { placeName, province, district, page = 1, limit = 10 } = req.query;

    // Ensure page and limit are numbers
    const pageNum = parseInt(page, 10); // Not a number >> Output: NaN
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
        name: { contains: placeName.trim(), mode: "insensitive" },
      };
    }

    if (province) {
      filters.place = {
        ...filters.place,
        province: {
          name: { contains: province.trim(), mode: "insensitive" },
        },
      };
    }

    if (district) {
      filters.place = {
        ...filters.place,
        district: {
          name: { contains: district.trim(), mode: "insensitive" },
        },
      };
    }

    // Fetch total count for pagination
    const totalPosts = await prisma.post.count({ where: filters });

    // Fetch paginated posts
    const posts = await prisma.post.findMany({
      where: filters,
      include: {
        place: {
          include: {
            province: true,
            district: true,
          },
        },
      },
      take: limitNum, // Limit per page
      skip: (pageNum - 1) * limitNum, // Offset
      orderBy: { createdAt: "desc" }, // Sort by newest
    });

    // Return paginated response
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = filterController;
