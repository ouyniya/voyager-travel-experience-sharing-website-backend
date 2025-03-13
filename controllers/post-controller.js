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

        /* mock */
        const userId = 5
        const budget = 8888 /* req.body */
        const view = 888 /* req.body */

        /* Check Place in database */
        const havePlace = await prisma.place.findFirst({
            where: {
                name: objPlace.name
            }
        })

        if(havePlace){
            /* Prisma Create Post and Images have place*/
            const newPost = await prisma.post.create({
                data: {
                    images: {
                        create: imagesUrl.map((item) => ({
                            url: item.secure_url,
                         })),
                    },
                    placeId:havePlace.id,
                    userId: userId,
                    title: title,
                    content: content,
                    budget: budget,
                    view: view
                }
            })
            return res.json(newPost)
        }else{

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
                    placeId:newPlace.id,
                    userId: userId,
                    title: title,
                    content: content,
                    budget: budget,
                    view: view
                }
            })
            return res.json(newPost)
        }

    } catch (error) {
        next(error);
    }
};

module.exports = postController;