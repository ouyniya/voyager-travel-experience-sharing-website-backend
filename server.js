require("dotenv").config();
const express = require("express");
const session = require("express-session"); // Use express-session
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const passportSetup = require("./configs/passport");

const authRoute = require("./routes/auth-route");
const postRoute = require("./routes/post-route");
const commentRoute = require("./routes/comment-route");
const handleErrors = require("./middlewares/error");
const notFound = require("./middlewares/not-found");
const aiRoute = require("./routes/ai-route");
const trackViewRoute = require("./routes/track-view-route");
const adminRoute = require("./routes/admin-route");
const wishlistRoute = require("./routes/wishlist-route");
const googleAuthRoute = require("./routes/google-auth");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Use express-session to handle sessions (instead of cookie-session)
app.use(
	session({
		secret: "googleauth", // Use your secret key
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000 // 24 hours
		}
	})
);

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add this to persist the user session

// Routes
app.use("/auth", googleAuthRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/ai", aiRoute);
app.use("/api/comments", commentRoute);
app.use("/api/track-view", trackViewRoute);
app.use("/api/admin", adminRoute);
app.use("/api/wishlists", wishlistRoute);

// error middlewares
app.use(handleErrors);
app.use(notFound);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
