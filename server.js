require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const passportSetup = require("./configs/passport")

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
app.use(cors());
app.use(morgan("dev"));
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["googleAuth"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

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
