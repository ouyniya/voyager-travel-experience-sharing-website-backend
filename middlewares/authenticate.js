const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const prisma = require("../configs/prisma");

const authenticate = async (req, res, next) => {
  try {
    console.log("Middleware authenticate running...");

    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer ")) {
      // ** JWT Token Authentication (Normal Login)**
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
      console.log("User authenticated via JWT:", user.username);
      return next();
    }

    // ** Google OAuth Session Authentication**
    console.log('-----', req.isAuthenticated())
    if (req.isAuthenticated && req.isAuthenticated()) {
      console.log("User authenticated via Google OAuth:", req.user);
      req.user = req.user; // Store Google user info in req.user
      return next();
    }

    return next(createError(401, "Unauthorized: No valid authentication method"));
  } catch (error) {
    console.error("Authentication error:", error);
    next(error);
  }
};

module.exports = authenticate;