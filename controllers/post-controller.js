const cloudinary = require("../configs/cloudinary")
const fs = require("fs/promises");
const prisma = require("../configs/prisma");

const postController = {};

postController.createPost = async (req, res, next) => {
    try {

        /* req.body */
        const { place, title, content, budget } = req.body
        /* แปลง String เป็น obj ด้วย JSON.parse */
        const objPlace = JSON.parse(place)

        /* req.user */
        const userId = req.user.id

        /* req.file */
        const images = req.files
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                fs.unlink(image.path)
                return result
            })
        )

        /* Check Place in database */
        const havePlace = await prisma.place.findFirst({
            where: {
                name: objPlace.name
            }
        })

        if (havePlace) {
            /* Prisma Create Post and Images have place*/
            const newPost = await prisma.post.create({
                data: {
                    images: {
                        create: imagesUrl.map((item) => ({
                            url: item.secure_url,
                        })),
                    },
                    placeId: havePlace.id,
                    userId: userId,
                    title: title,
                    content: content,
                    budget: +budget,
                }
            })
            return res.json({ message: "create post", newPost })
        } else {

            /* Prisma Create */
            /* Prisma Create Place, Post, Images whitout place*/
            const newPlace = await prisma.place.create({
                data: {
                    name: objPlace.name,
                    description: objPlace.description,
                    latitude: +objPlace.latitude,
                    longitude: +objPlace.longitude,
                    provinceId: +objPlace.provinceId,
                    districtId: +objPlace.districtId
                }
            })
            const newPost = await prisma.post.create({
                data: {
                    images: {
                        create: imagesUrl.map((item) => ({
                            url: item.secure_url,
                        })),
                    },
                    placeId: newPlace.id,
                    userId: userId,
                    title: title,
                    content: content,
                    budget: +budget,
                }
            })
            return res.json({ message: "create post and add new place", newPost })
        }
        // res.json({message:"createPost"})

    } catch (error) {
        next(error);
    }
};

postController.getAllPosts = async (req, res, next) => {
    try {
        const post = await prisma.post.findMany({
            select: {
                id: true,
                userId: true,
                placeId: true,
                title: true,
                content: true,
                budget: true,
                view: true,
                images: true
            }
        })

        res.json({ message: "getAllPosts", post })
    } catch (error) {
        next(error)
    }
}

postController.getPostFromUserId = async (req, res, next) => {
    try {
        const { userId } = req.params
        const post = await prisma.post.findMany({
            where: {
                userId: +userId
            }
        })

        res.json({ message: "getPostFromUserId", post })
    } catch (error) {
        next(error)
    }
}

postController.getPostFromPostId = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await prisma.post.findFirst({
            where: {
                id: +id
            }
        })
        res.json({ message: "getPostFromPostId", post })
    } catch (error) {
        next(error)
    }
}

postController.updatePost = async (req, res, next) => {
    try {
        /* req.params */
        const { id } = req.params
        /* req.body */
        const { title, content, place, budget} = req.body
        // const placeName = place.name

        /* req.user */
        const userId = req.user.id

        /* find place */
        const havePlace = await prisma.place.findFirst({
            where: {
                name: place.name
            }
        })

        /* check place */
        if (havePlace) {
            /* find post */
            const havePost = await prisma.post.findFirst({
                where: {
                    id: +id
                }
            })

            /* update */
            const post = await prisma.post.update({
                where: {
                    id: +id
                },
                data: {
                    title: title,
                    content: content,
                    budget: +budget,
                    placeId: havePlace.id
                },
            })

            return res.json({ message: "Update role success", post })
        } else {
            const newPlace = await prisma.place.create({
                data: {
                    name: place.name,
                    description: place.description,
                    latitude: +place.latitude,
                    longitude: +place.longitude,
                    provinceId: +place.provinceId,
                    districtId: +place.districtId
                }
            })
            /* find post */
            const havePost = await prisma.post.findFirst({
                where: {
                    id: +id
                }
            })

            /* update */
            const post = await prisma.post.update({
                where: {
                    id: +id
                },
                data: {
                    title: title,
                    content: content,
                    budget: +budget,
                    placeId: newPlace.id
                },
            })
            console.log("post update")
            console.log(post)

            return res.json({ message: "Update role success", post })
            // return res.json({ message: "place not found" })
        }


    } catch (error) {
        next(error)
    }
}

postController.deletePost = async (req, res, next) => {
    try {
        /* req.params */
        const { id } = req.params

        /* req.user */
        const userId = req.user.id

        const deleted = await prisma.post.delete({
            where: {
                id: +id
            }
        })
        res.json({ message: `post id: ${id} has been deleted.`, deleted })
    } catch (error) {
        next(error)
    }
}



module.exports = postController;