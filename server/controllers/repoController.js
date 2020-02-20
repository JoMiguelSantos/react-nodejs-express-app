const Repos = require("../models/repoModel");
const fetch = require("isomorphic-unfetch");

exports.searchRepos = async (req, res) => {
  // if req.query is empty then ask for input
  if (req.query.length === 0)
    res
      .status(400)
      .end(
        "You have not provided any search term, please visit the API documentation to know all allowed search terms and correct syntax"
      );

  // parse search terms available
  const { name, description, readme, language, topic } = req.query;

  // aggregate search terms
  let searchTerms = [];
  name && searchTerms.push(`${name}+in:name`);
  description && searchTerms.push(`${description}+in:description`);
  readme && searchTerms.push(`${readme}+in:readme`);
  language && searchTerms.push(`language:${language}`);
  topic && searchTerms.push(`topic:${topic}`);

  //if there's
  if (searchTerms.length === 0)
    res
      .status(422)
      .end(
        "You have not provided any of the allowed search terms, please visit the API documentation to know all allowed search terms"
      );

  // if there's more than one search term then join them with a "+" separator
  searchTerms = searchTerms.length > 1 ? searchTerms.join("+") : searchTerms[0];

  const data = await fetch(
    `https://api.github.com/search/repositories?q=${searchTerms}`
  );

  const repos = await data.json();

  // save the searched repos into the "DB"
  Repos.repos = repos.items;

  res.status(200).json({
    status: "success",
    data: {
      data: repos
    }
  });
};
