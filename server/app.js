const bookmarkRouter = require("./routes/bookmarkRoutes");
const repoRouter = require("./routes/repoRoutes");

const express = require("express");
const app = express();

// middleware for parsing the body in req
app.use(express.json());

// ROUTES
app.use("/api/v1/repos", repoRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);

module.exports = app;
