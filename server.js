require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth-route");
const postRoute = require("./routes/post-route");
const handleErrors = require("./middlewares/error");
const notFound = require("./middlewares/not-found");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute)

// error middlewares
app.use(handleErrors);
app.use(notFound)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));