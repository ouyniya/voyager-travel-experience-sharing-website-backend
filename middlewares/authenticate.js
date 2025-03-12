const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const prisma = require("../configs/prisma");

const authenticate = async (req, res, next) => {
  try {
    console.log("Middleware authenticate running...");

    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError(401, "Unauthorized: No token provided"));
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return next(createError(401, "Unauthorized: Invalid token format"));
    }

    let jwtPayload;
    try {
      jwtPayload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return next(createError(403, "Forbidden: Invalid token"));
    }

    const user = await prisma.user.findFirst({
      where: { id: jwtPayload.id },
    });

    if (!user) {
      return next(createError(400, "User not found"));
    }

    delete user.password;
    req.user = user;

    console.log("User authenticated:", user.username);
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    next(error);
  }
};

module.exports = authenticate;