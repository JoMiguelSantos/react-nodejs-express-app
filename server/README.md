# Instructions

## Introduction

This service gets repositories from the [GitHub API v3](https://developer.github.com/v3/) using search terms and allows you to bookmark your favorite repositories.

## Install dependencies

To install all necessary dependencies run `npm install`

## Start Server

To start the server run `npm start`

## Search Terms

You are able to search for terms by the repository `name`, `description`, `readme`, `topic`, and `language`.

## Requests

You can test the routes, `api/v1/bookmarks` and `api/v1/repos` by using Postman or other similar HTTP service. For POSTing and DELETEing use the body to send `{"repoId": repoId}`, to bookmark and delete bookmark respectively.
