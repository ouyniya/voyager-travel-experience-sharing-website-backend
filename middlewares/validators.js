const { z } = require("zod");

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
