const path = require("path")
const multer  =require("multer")

// console.log(__dirname)
// node ./src/middlewares/upload.js

const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, path.join(__dirname, "../upload-images")),
    filename: (req,file,cb) => {
    let fileExt = path.extname(file.originalname) /* เอานาสกุลไฟล์ .png .ต่างๆ */
    cb(null, `pic_${Date.now()}_${Math.round(Math.random()*100)}${fileExt}`)
}
})

module.exports = multer({storage:storage})