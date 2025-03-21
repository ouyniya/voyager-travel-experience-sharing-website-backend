const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const wishlistController = {};

// 1. Create Wishlist (Only for ADMIN & USER roles)
wishlistController.createWishlist = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;
    const loggedInUserRole = req.user?.role;

    //Validate required fields
    if (!userId || !postId) {
      return createError(400, "userId and postId are required.");
    }

    //Check if the user exists
    const userExists = await prisma.user.findUnique({ where: { id: +userId } });
    if (!userExists) {
      return createError(404, `User with ID ${userId} not found.`);
    }

    //heck if the post exists
    const postExists = await prisma.post.findUnique({ where: { id: +postId } });
    if (!postExists) {
      return createError(404, `Post with ID ${postId} not found.`);
    }

    //Check if user role is allowed (Only ADMIN or USER)
    if (loggedInUserRole !== "ADMIN" && loggedInUserRole !== "USER") {
      return createError(
        403,
        "Access denied. Only ADMIN or USER can create wishlists."
      );
    }

    //Check if wishlist already exists for this user and post
    const existingWishlist = await prisma.wishlist.findFirst({
      where: { userId: +userId, postId: +postId },
    });

    if (existingWishlist) {
      return createError(400, "This post is already in the user's wishlist.");
    }

    //Create wishlist entry
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

// 2. Show All Wishlists (Only ADMIN Can Access)
wishlistController.getAllWishlists = async (req, res, next) => {
  try {
    //Check if user role is ADMIN
    if (!req.user || req.user.role !== "ADMIN") {
      return createError(403, "Access denied. Admins only.");
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; // ✅ Limit 10 wishlists per page

    //Fetch wishlists
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

    // let images = []
    // for (let el of )
    // const images = await prisma.postImage.findFirst

    //Get total count
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

// 3. Get all wishlist posts by userId (Users ดู wishlist ของตัวเองเท่านั้น, Admin ดูได้หมด)
wishlistController.getWishlistByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user?.id;
    const userRole = req.user?.role;

    // Validate userId (must be a number)
    if (!userId || isNaN(userId)) {
      return createError(400, "Invalid userId. It must be a number.");
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: +userId },
    });
    if (!userExists) {
      return createError(404, `User with ID ${userId} not found.`);
    }

    // Users สามารถดู wishlist ของตัวเองเท่านั้น, ส่วน Admin ดูได้หมด
    if (userRole !== "ADMIN" && +userId !== loggedInUserId) {
      return createError(
        403,
        "Access denied. You can only view your own wishlist."
      );
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
            view: true,
            placeId: true,
            images: {
              take: 1, // Get the first image for each post
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    // Add image and post details to the result
    const wishlistWithDetails = wishlists.map((wishlist) => {
      const post = wishlist.post;
      const postImage = post.images.length > 0 ? post.images[0].url : null; // Get first image URL or null if none
      return {
        ...wishlist,
        post: {
          ...post,
          postImage,
        },
      };
    });

    res.json({
      message: `Wishlist for User ID ${userId}`,
      totalWishlists: wishlistWithDetails.length,
      result: wishlistWithDetails,
    });
  } catch (error) {
    next(error);
  }
};

wishlistController.deleteWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { wishlistId } = req.params;

    // Validate userId (must be a number)
    if (!userId || isNaN(userId)) {
      return createError(400, "Invalid userId. It must be a number.");
    }
    if (!wishlistId || isNaN(wishlistId)) {
      return createError(400, "Invalid wishlistId. It must be a number.");
    }

    // // Check if user exists
    const wishlistsExists = await prisma.wishlist.findUnique({
      where: { id: +wishlistId },
    });
    if (!wishlistsExists) {
      return createError(404, `Wishlist ID ${wishlistId} not found.`);
    }

    // Fetch wishlists for the given user
    const wishlists = await prisma.wishlist.delete({
      where: { userId: +userId, id: +wishlistId },
    });

    res.json({
      message: `Wishlist ID ${wishlistId} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = wishlistController;
