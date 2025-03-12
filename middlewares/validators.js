const { z } = require("zod");

exports.registerSchema = z
  .object({
    email: z.string().email({ message: "Email is invalid" }).nonempty({ message: "Email is required" }),
    username: z.string().optional(),
    password: z.string().min(6, { message: "Password should be at least 6 characters" }).nonempty({ message: "Password is required" }),
    confirmPassword: z.string().min(6, { message: "Password should be at least 6 characters" }).nonempty({ message: "Confirm Password is required" }),
   })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });

exports.loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password should be at least 6 characters"),
});

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
