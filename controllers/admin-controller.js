const prisma = require("../configs/prisma")
const createError = require("../utils/createError")


const adminController = {}

// แสดง User ทั้งหมด
adminController.listUsers = async (req, res, next) => {
    try {

        if (req.user.role !== "ADMIN") {
            return createError(403, "Access denied. Admins only.");
          }

        const users = await prisma.user.findMany({
            omit: {
                password: true
            }
        })
        console.log(users)
        res.json({message:"listUsers", result: users})
    } catch (error) {
        next(error)
    }
}

// Update Role จาก Id ที่เลือก ADMIN <---> USER
adminController.updateRole = async (req, res, next) => {
    try {
        // Check if the requester is an ADMIN
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        console.log(req.body)
        const { id, role } = req.body;

        // Validate `id` (must be a number)
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Invalid user ID. ID must be a number." });
        }

        // Validate `role` (must be either ADMIN or USER)
        if (role !== "ADMIN" && role !== "USER") {
            return res.status(400).json({ error: "Invalid role. Role must be either 'ADMIN' or 'USER'." });
        }

        // Check if the user exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { id: +id },
        });

        if (!existingUser) {
            return res.status(404).json({ error: `User with ID ${id} not found.` });
        }

        // Update the user role
        const updated = await prisma.user.update({
            where: { id: +id },
            data: { role: role },
        });

        res.json({ message: `Update User#${id} to ${role} role successful` });
    } catch (error) {
        next(error);
    }
};


// แสดง Post ทั้งหมด (with Pagination)
adminController.listPosts = async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            return createError(403, "Access denied. Admins only.");
          }


        // ✅ Extract page number from query, default to 1
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10; // ✅ Limit 10 posts per page
        console.log("page")
        console.log(page)
        console.log("pageSize")
        console.log(pageSize)

        // ✅ Fetch posts with pagination
        const posts = await prisma.post.findMany({
            skip: (page - 1) * pageSize, // ✅ Skip previous pages
            take: pageSize, // ✅ Limit to 10 posts
            select: {
                id: true,
                title: true,
                content: true,
                budget: true,
                place: {
                    select:{
                        id:true,
                        name:true,
                        description:true,
                    }
                },
                user: {
                    select: {
                        id: true, 
                        username: true, 
                        email: true,
                        role: true, 
                        profileImage: true, 
                        createdAt: true
                    }
                }
            }
        });

        // ✅ Get total post count for pagination info
        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / pageSize);

        console.log(posts);
        res.json({
            message: "listPosts",
            currentPage: page,
            totalPages: totalPages,
            totalPosts: totalPosts,
            result: posts
        });
    } catch (error) {
        next(error);
    }
};


// แสดง Post ของแต่ละ User
adminController.currentPost = async (req, res ,next) =>{
    try {
        if (req.user.role !== "ADMIN") {
            return createError(403, "Access denied. Admins only.");
          }

        const {id} = req.params

        // Check if the user exists in the database
          const existingUser = await prisma.user.findUnique({
            where: { id: +id },
        });

        if (!existingUser) {
            return res.status(404).json({ error: `User with ID ${id} not found.` });
        }

        

        const post = await prisma.post.findMany({
            where:{
                userId:+id
            },
            select:{
                id:true,
                userId:true,
                placeId:true,
                title:true,
                content:true,
            }
        })
        console.log(post)
        res.json({
            message:"Current Post",
            result:post})
    } catch (error) {
        next(error)
    }
}

// ลบ Post (Only ADMIN)
adminController.deletePost = async (req, res, next) => {
    try {
        // Check if the requester is an ADMIN
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        const { id } = req.params;

        // Validate `id` (must be a number)
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Invalid post ID. ID must be a number." });
        }

        // Check if the post exists before deleting
        const existingPost = await prisma.post.findUnique({
            where: { id: +id },
        });

        if (!existingPost) {
            return res.status(404).json({ error: `Post with ID ${id} not found.` });
        }

        // Delete the post
        await prisma.post.delete({
            where: { id: +id }
        });

        res.json({ message: `Delete Post ${id} Success!!` });
    } catch (error) {
        next(error);
    }
};

adminController.deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const deleted = await prisma.user.delete({
            where:{
                id: +id
            }
        })
        res.json({message:"Delete success",deleted})
    } catch (error) {
        next(error)
    }
}

module.exports = adminController;
