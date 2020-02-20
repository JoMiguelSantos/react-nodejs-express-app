const express = require("express");

const repoController = require("./../controllers/repoController");

const router = express.Router();

router.route("/").get(repoController.searchRepos);

module.exports = router;
