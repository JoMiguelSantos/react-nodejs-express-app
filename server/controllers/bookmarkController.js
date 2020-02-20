const Bookmarks = require("../models/bookmarkModel");
const Repos = require("../models/repoModel");

// async just to mimic a DB call
exports.getBookmarks = async (req, res) => {
  const bookmarks = await Bookmarks.getBookmarks;
  const bookmarkedRepos = await Repos.bookmarkedRepos(bookmarks);
  res.status(200).json({
    status: "success",
    data: {
      data: bookmarkedRepos
    }
  });
};

exports.bookmarkRepo = async (req, res) => {
  const { repoId } = req.body;
  await Bookmarks.addBookmark(repoId);
  res.status(201).json({
    status: "success",
    data: {
      data: { repoId: repoId, isBookmarked: true }
    }
  });
};

exports.delBookmark = async (req, res) => {
  const { repoId } = req.body;
  await Bookmarks.delBookmark(repoId);
  res.status(204).json({
    status: "success",
    data: null
  });
};
