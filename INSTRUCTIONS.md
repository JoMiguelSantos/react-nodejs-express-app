# Coding challenge for Jr. Software Engineer

In order to get a better understanding of your level as a programmer, we ask you to complete a small task that resembles some of tasks you could potentially encounter while working.

The main goal is a small HTTP API that is being used by a React frontend.

## Backend

The backend will expose an HTTP API to search for Github repositories. This can be done with the Github API which is described here: ​https://developer.github.com/v3/
Please write the API with Node.js and express.js. There should be:

1. one endpoint that takes a search term and returns a list of repositories. Hint: Don’t implement pagination for this challenge.
2. one endpoint that allows bookmarking a repository by its id. Hint: Bookmarks don’t need to be persisted in a database for this challenge.
3. one endpoint to get all bookmarked repositories

NOTE​: Bookmarks are “application wide” - you don’t need a concept of different users. Each user of the API will add to / be shown the same list of bookmarked repositories.

While writing please be mindful of the following:

- While there will probably not be a lot of code please structure it in a way that you would use in a larger project. Meaning: There should definitely be more than one file.
- Think about parts of the application that could be externally configurable and prepare your code for this. There doesn’t need to be a configuration system.
- Use git for version control
- Include a small README that explains how to start your service

Some “bonus” features if you have enough time:

- Add documentation for ​your​ API in a format of your choice
- Add tests. Which layers of the application can you test? Can you write tests that don’t rely on the Github API being available?
- Add basic authentication to your API
- Add an endpoint to remove a bookmark

## Frontend

Using React.js and Redux, write a frontend for the API that you developed that allows a user to search for repositories. The repositories will be presented in a list format and each found repository can be bookmarked.
Another page/section of the frontend lists the currently bookmarked repositories.
NOTE​: You don’t need to overdo the representational part. You can represent a repository with its name and owner name, maybe the number of stars and forks to the user. However, this is only a suggestion -- have fun with it!

While writing please be mindful of the following:

- While there will probably not be a lot of code please structure it in a way that you would use in a large project.
- Use git for version control (can be the same repository as the backend).

Some “bonus” features if you have enough time:

- Include a small README on how to start and access the frontend.
- Add tests for your frontend
- Don’t use Bootstrap, hint: use Flexbox or CSS Grid
- Use the “remove bookmark” endpoint if you programmed it to allow the user to remove a bookmark
