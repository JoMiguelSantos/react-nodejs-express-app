# React-Node-Express App

This app was built as a fullstack app with an API on the backend which serves as a simplified GitHub v3 API, taking a limited number of specific search terms and returns an array with GitHub Repos which is then used by the Frontend, built with React, to display these Repos and allows you to Un/Bookmark the Repos of your choice and visit a page which has all bookmarked Repos.

It has no data persistance in the form of a Database or LocalStorage so the data will only stay in the Redux Store/Server for as long as the server is up and running.

Testing was added recently and is not meant to be streamlined and consistent but rather a display of the different tools possible to use. I've used mostly Jest/React Testing Library for the Unit Testing and even though I played around with Enzime it didn't end up making the cut for what I planned to test. I used Cypress for the Integration Tests and End-To-End Tests. It's an amazing tool with is definitly not explored enough in this app, which has an huge potential for BDD and my next app will for sure use it as such from the start. Heads Up, for you to test the Frontend you'll need to have the backend server up before you run Cypress tests.

You can find a README in both client and server that shows you how to make each other in Dev and give it a try locally
