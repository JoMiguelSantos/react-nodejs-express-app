const Bookmarks = require("../models/bookmarkModel");
const Repos = require("../models/repoModel");

// async just to mimic a DB call
exports.getBookmarks = async (req, res) => {
  const bookmarks = await Bookmarks.getBookmarks;
  const bookmarkedRepos = await Repos.bookmarkedRepos(bookmarks);
  res
    .status(200)
    .set("Content-Type", "applicaton/json")
    .json({
      status: "success",
      data: {
        data: bookmarkedRepos
      }
    });
};

exports.bookmarkRepo = async (req, res) => {
  const { repoId } = req.body;

  if (!repoId)
    return res
      .status(400)
      .set("Content-Type", "text/html")
      .end(
        "You have not provided a repository ID, please provide a JSON object with the 'repoId' key and corresponding value"
      );

  await Bookmarks.addBookmark(repoId);
  res
    .status(201)
    .set("Content-Type", "applicaton/json")
    .json({
      status: "success",
      data: {
        data: { repoId: repoId, isBookmarked: true }
      }
    });
};

exports.delBookmark = async (req, res) => {
  const { repoId } = req.body;

  if (!repoId)
    return res
      .status(400)
      .set("Content-Type", "text/html")
      .end(
        "You have not provided a repository ID, please provide a JSON object with the 'repoId' key and corresponding value"
      );

  await Bookmarks.delBookmark(repoId);
  res.status(204).json({
    status: "success",
    data: null
  });
};
