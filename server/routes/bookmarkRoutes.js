const express = require("express");

const bookmarkController = require("./../controllers/bookmarkController");

const router = express.Router();

router
  .route("/")
  .get(bookmarkController.getBookmarks)
  .post(bookmarkController.bookmarkRepo)
  .delete(bookmarkController.delBookmark);

module.exports = router;
