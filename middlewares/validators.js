const { z } = require("zod");

// exports.registerSchema = z
//   .object({
//     username: z.string().min(3, "username should be at least 3 characters"),
//     email: z.string().email("Email is not valid"),    
//     password: z.string().min(6, "Password should be at least 6 characters"),    
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Confirm Password ไม่ตรงกัน",
//     path: ["confirmPassword"],
//   });

// exports.loginSchema = z.object({
//   email: z.string().email("Email ไม่ถูกต้อง"),
//   password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
// });

exports.commentSchema = z.object({
  postId: z.number().int().nonnegative(),
  userId: z.number().int().nonnegative(),
  content: z.string(),
  parentId: z.number().int().nonnegative().nullable(), // string | null
});

exports.validationZod = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errMsg = error.errors.map((el) => el.message);
    const errTxt = errMsg.join(", ");
    const mergeError = new Error(errTxt);

    next(mergeError);
  }
};
