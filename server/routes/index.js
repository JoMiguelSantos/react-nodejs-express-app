// const express = require("express");
const app = require("../server");

// one endpoint that takes a search term and returns a list of repositories.
// Hint: Don’t implement pagination for this challenge.
// GET request with query.term=string or nothing and returns a repos list
app.get("/", (req, res) => {
  //   fetch("https://api.github.com");
  res
    .status(200)
    .send({ message: "get working", anotherOne: "buuuummmm", one: "two" });
});

// one endpoint that allows bookmarking a repository by its id.
// Hint: Bookmarks don’t need to be persisted in a database for this challenge.
// PUT request to update "favorite" key with "true"
app.put("/", (req, res) => {
  res.status(200).send("updated this!");
});

// one endpoint to get all bookmarked repositories
//GET with query.bookmarked=true
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "get working", anotherOne: "buuuummmm", one: "two" });
});

// Add an endpoint to remove a bookmark
// DELETE with Id/repo name
app.delete("/", (req, res) => {
  res
    .status(200)
    .send({ message: "get working", anotherOne: "buuuummmm", one: "two" });
});

// NOTE​: Bookmarks are “application wide” - you don’t need a concept of different users.
// Each user of the API will add to / be shown the same list of bookmarked repositories.
