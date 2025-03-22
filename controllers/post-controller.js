const cloudinary = require("../configs/cloudinary");
const fs = require("fs/promises");
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    /* req.body */
    const {
      title,
      content,
      budget,
      name,
      description,
      latitude,
      longitude,
      provinceId,
      districtId,
    } = req.body;

    const userId = req.user.id;

    // Validate inputs
    if (
      !title.trim() ||
      !content.trim() ||
      !budget ||
      !name ||
      !description ||
      !latitude ||
      !longitude ||
      !provinceId ||
      !districtId
    ) {
      return createError(400, "Missing some inputs");
    }

    if (
      isNaN(latitude) ||
      isNaN(longitude) ||
      isNaN(provinceId) ||
      isNaN(districtId) ||
      isNaN(budget)
    ) {
      return createError(400, "Invalid number");
    }

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof name !== "string" ||
      typeof description !== "string"
    ) {
      return createError(400, "Invalid type of input");
    }

    /* req.file or req.files handling */
    const images = req.files || (req.file ? [req.file] : []); // Handle both cases

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        fs.unlink(image.path, (err) => {
          if (err) console.error("Failed to delete temp file:", err);
        });
        return result.secure_url; // Return only secure URLs
      })
    );

    if (imagesUrl.length === 1) {
      imagesUrl = imagesUrl[0]; // Return a single URL if only one image
    }

    /* Check Place in database */
    const havePlace = await prisma.place.findFirst({
      where: { name },
    });

    if (havePlace) {
      const newPost = await prisma.post.create({
        data: {
          images: {
            create: Array.isArray(imagesUrl)
              ? imagesUrl.map((url) => ({ url }))
              : [{ url: imagesUrl }],
          },
          placeId: havePlace.id,
          userId: userId,
          title: title,
          content: content,
          budget: +budget,
        },
      });
      return res.json({ message: "create post", newPost });
    } else {
      const newPlace = await prisma.place.create({
        data: {
          name,
          description,
          latitude: +latitude,
          longitude: +longitude,
          provinceId: +provinceId,
          districtId: +districtId,
        },
      });

      const newPost = await prisma.post.create({
        data: {
          images: {
            create: Array.isArray(imagesUrl)
              ? imagesUrl.map((url) => ({ url }))
              : [{ url: imagesUrl }],
          },
          placeId: newPlace.id,
          userId: userId,
          title: title,
          content: content,
          budget: +budget,
        },
      });
      return res.json({ message: "create post and add new place", newPost });
    }
  } catch (error) {
    next(error);
  }
};


// postController.getAllPosts = async (req, res, next) => {
//   try {
//     const post = await prisma.post.findMany({
//       select: {
//         id: true,
//         userId: true,
//         placeId: true,
//         title: true,
//         content: true,
//         budget: true,
//         view: true,
//         images: true,
//       },
//     });

//     res.json({ message: "getAllPosts", post });
//   } catch (error) {
//     next(error);
//   }
// };

postController.getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        images: true,
        place: {
          include: {
            province: true,
            district: true,
          },
        },
      },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      placeName: post.place.name,
      latitude: post.place.latitude,
      longitude: post.place.longitude,
      description: post.place.description,
      province: post.place.province.name,
      district: post.place.district.name,
      image: post.images.length > 0 ? post.images[0].url : null,
    }));

    res.json({ message: "getAllPosts", posts: formattedPosts });
  } catch (error) {
    next(error);
  }
};

postController.getPostFromUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    //validate
    if (isNaN(userId)) {
      return createError(400, "Invalid User id");
    }

    const post = await prisma.post.findMany({
      where: {
        userId: +userId,
      },
      include: {
        place: {
          include: {
            province: true,
            district: true,
          },
        },
      },
    });

    if (!post) {
      return createError(400, "No post found");
    }

    res.json({ message: "getPostFromUserId", post });
  } catch (error) {
    next(error);
  }
};

postController.getPostFromPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    //validate
    if (isNaN(id)) {
      return createError(400, "Invalid Post id");
    }
    const post = await prisma.post.findFirst({
      where: {
        id: +id,
      },
      include: {
        place: {
          include: {
            province: true,
            district: true,
          },
        },
        user: {
          omit: {
            password: true,
          },
        },
      },
    });

    const postImage = await prisma.postImage.findMany({
      where: {
        postId: +id,
      },
    });

    res.json({ message: "getPostFromPostId", post, postImage });
  } catch (error) {
    next(error);
  }
};

postController.updatePost = async (req, res, next) => {
  try {
    /* req.params */
    const { id } = req.params;
    /* req.body */
    const {
      title,
      content,
      budget
    } = req.body;

    /* req.user */
    const userId = req.user.id;

    /* find post */
    const havePost = await prisma.post.findFirst({
      where: {
        id: +id,
        userId: +userId
      }
    })

    /* update */
    if (havePost){
      const updatePost = await prisma.post.update({
        where: {
          id: +id,
        },
        data: {
          title: title,
          content: content,
          budget: +budget,
        }
      })
      return res.json({ message: "Update post success", updatePost })
    }else {
      return createError(400, "No post found")
    }
    
  } catch (error) {
    next(error);
  }
};

postController.deletePost = async (req, res, next) => {
  try {
    /* req.params */
    const { id } = req.params;

    /* req.user */
    const userId = req.user.id;

    const deleted = await prisma.post.delete({
      where: {
        id: +id,
      },
    });
    res.json({ message: `post id: ${id} has been deleted.`, deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = postController;
