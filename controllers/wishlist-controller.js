const prisma = require("../configs/prisma");

// 1.Create Wishlist (Only for ADMIN & USER roles)
const createWishlist = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    const loggedInUserRole = req.user?.role;

    // Validate required fields
    if (!userId || !postId) {
      return res.status(400).json({ error: "userId and postId are required." });
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({ where: { id: +userId } });
    if (!userExists) {
      return res.status(404).json({ error: `User with ID ${userId} not found.` });
    }

    // Check if the post exists
    const postExists = await prisma.post.findUnique({ where: { id: +postId } });
    if (!postExists) {
      return res.status(404).json({ error: `Post with ID ${postId} not found.` });
    }

    // Check if user role is allowed (Only ADMIN or USER)
    if (loggedInUserRole !== "ADMIN" && loggedInUserRole !== "USER") {
      return res.status(403).json({ error: "Access denied. Only ADMIN or USER can create wishlists." });
    }

    // Check if wishlist already exists for this user and post
    const existingWishlist = await prisma.wishlist.findFirst({
      where: { userId: +userId, postId: +postId },
    });

    if (existingWishlist) {
      return res.status(400).json({ error: "This post is already in the user's wishlist." });
    }

    // Create wishlist entry
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: +userId,
        postId: +postId,
        createdAt: new Date(),
      },
    });

    res.json({ message: "Wishlist created successfully!", wishlist });
  } catch (error) {
    next(error);
  }
};


// 2.Show All Wishlists (Only ADMIN Can Access)
const getAllWishlists = async (req, res, next) => {
  try {
    // Check if user role is ADMIN
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; // Limit 10 wishlists per page

    // Fetch wishlists
    const wishlists = await prisma.wishlist.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            budget: true,
            placeId: true,
          },
        },
      },
    });

    // Get total count
    const totalWishlists = await prisma.wishlist.count();
    const totalPages = Math.ceil(totalWishlists / pageSize);

    res.json({
      message: "List of Wishlists",
      currentPage: page,
      totalPages: totalPages,
      totalWishlists: totalWishlists,
      result: wishlists,
    });
  } catch (error) {
    next(error);
  }
};


// 3.Get all wishlist posts by userId (Users ดู wishlist ของตัวเองเท่านั้น, ส่วน Admin ดูได้หมดทุก id)
const getWishlistByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user?.id;
    const userRole = req.user?.role;

    // Validate userId (must be a number)
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId. It must be a number." });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: +userId },
    });
    if (!userExists) {
      return res.status(404).json({ error: `User with ID ${userId} not found.` });
    }

    // Users สามารถดู wishlist ของตัวเองเท่านั้น, ส่วน Admin ดูได้หมดทุก id
    if (userRole !== "ADMIN" && +userId !== loggedInUserId) {
      return res.status(403).json({ error: "Access denied. You can only view your own wishlist." });
    }

    // Fetch wishlists for the given user
    const wishlists = await prisma.wishlist.findMany({
      where: { userId: +userId },
      select: {
        id: true,
        createdAt: true,
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            budget: true,
            placeId: true,
          },
        },
      },
    });

    res.json({
      message: `Wishlist for User ID ${userId}`,
      totalWishlists: wishlists.length,
      result: wishlists,
    });
  } catch (error) {
    next(error);
  }
};

  

module.exports = { getAllWishlists, createWishlist, getWishlistByUserId };
