const cloudinary = require("../configs/cloudinary")
const fs = require("fs/promises");
const prisma = require("../configs/prisma");

const postController = {};

postController.createPost = async (req, res, next) => {
    try {

        /* req.body */
        const { place, title, content } = req.body
        /* แปลง String เป็น obj ด้วย JSON.parse */
        const objPlace = JSON.parse(place)

        /* req.file */
        const images = req.files
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                fs.unlink(image.path)
                return result
            })
        )
        // console.log("images")
        // console.log(images)
        // console.log("imagesUrl")
        console.log(imagesUrl[0].secure_url)

        /* mock */
        const userId = 5 /* req.user.id */
        const budget = 8888 /* req.body */
        const view = 888 /* req.body */

        /* Prisma Create */
        /* Place */
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
        /* Post and Images */
        const newPost = await prisma.post.create({
            data: {
                images: {
                    create: imagesUrl.map((item) => ({
                        url: item.secure_url,
                     })),
                },
                placeId:newPlace.id,
                userId: userId,
                title: title,
                content: content,
                budget: budget,
                view: view
            }
        })

        res.json(newPost)
    } catch (error) {
        next(error);
    }
};

module.exports = postController;