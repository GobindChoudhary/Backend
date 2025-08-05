const express = require("express");
const authRoute = require("./routers/auth.routes");
const postRoute = require("./routers/post.routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
