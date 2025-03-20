const { z } = require("zod");

exports.registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .nonempty({ message: "Email is required" }),
    username: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters" })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmed password should be at least 6 characters" })
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });

exports.loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password should be at least 6 characters"),
});

exports.placeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Place's name should be at least 3 characters" }),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  provinceId: z.number().int().nonnegative(),
  districtId: z.number().int().nonnegative(),
});

exports.commentSchema = z.object({
  postId: z.number().int().nonnegative(),
  userId: z.number().int().nonnegative(),
  content: z.string(),
  parentId: z.number().int().nonnegative().nullable(), // string | null
});

// exports.createPostSchema = z
//   .object({
//     title: z.string().nonempty({ message: "Title is required" }),
//     content: z.string().nonempty({ message: "Content is required" }),
//     budget: z
//       .number()
//       .positive({ message: "Budget must be a positive number" })
//       .nonnegative({ message: "Budget is required" }),
//     name: z.string().nonempty({ message: "Name is required" }),
//     description: z.string().nonempty({ message: "Description is required" }),
//     latitude: z
//       .number()
//       .min(0, { message: "Latitude must be a non-negative number" }),
//     longitude: z
//       .number()
//       .min(0, { message: "Longitude must be a non-negative number" }),
//     provinceId: z
//       .number()
//       .int()
//       .positive({ message: "Province ID must be a positive integer" }),
//     districtId: z
//       .number()
//       .int()
//       .positive({ message: "District ID must be a positive integer" }),
//   })
//   .refine((data) => data.latitude && data.longitude, {
//     message: "Latitude and Longitude must be provided",
//     path: ["latitude", "longitude"],
//   })
//   .refine((data) => data.provinceId && data.districtId, {
//     message: "Province ID and District ID must be provided",
//     path: ["provinceId", "districtId"],
//   });

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
