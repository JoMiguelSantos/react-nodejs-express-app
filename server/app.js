const express = require("express");
const app = express();

// middleware for parsing the body in req
app.use(express.json());

module.exports = app;
