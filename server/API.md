# EzGitHub API

This API makes it easy to search and bookmark the GitHub repositories you're looking for.

## Getting Started

This API is based on the REST API framework. This API has predictable resource-oriented URLs, returns JSON-encoded responses, and uses standard HTTP response codes.

## Examples

Bellow you can find some usage examples.

### Searching for Repos

- Request:

  - Method/URL: `GET http://localhost:4000/repos?name=repo-name&description=a repos description&readme=get started&language=javascript&topic=state management`
  - Query:
    - Name: repository name
    - Description: repository description
    - README: repository readme
    - Language: main repository scripting language
    - Topic: GitHub's topic identifier (e.g. state management)

- Response
  - Status: 200
  - Body: JSON Object

### Bookmarking a Repo

- Request:

  - Method/URL: `POST http://localhost:4000/bookmarks`
  - Body: `repoId`

- Response
  - Status: 201
  - Body: JSON Object

### Deleting a bookmark

- Request:

  - Method/URL: `DELETE http://localhost:4000/bookmarks`
  - Body: `repoId`

- Response
  - Status: 204
  - Body: null

### Getting all bookmarks

- Request:

  - Method/URL: `GET http://localhost:4000/bookmarks`

- Response
  - Status: 200
  - Body: JSON Object
