describe("bookmarks and unbookmarks repos", () => {
  it("is able to bookmark repos and find them on the bookmarks page", () => {
    cy.visit("/");
    cy.contains(/name/i)
      .click()
      .type("react");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get(".repo__descriptor--items").each((repo, index, repos) => {
      // pseudo random order of non consecutive bookmarking
      if (index < 10 && index % 3 === 0) {
        cy.get(repo)
          .contains("Bookmark")
          .click();
      }
    });
    cy.get(".repo__descriptor--items")
      .filter(":contains('Unbookmark')")
      .then(clickedRepos => {
        cy.contains("Bookmarks").click();
        cy.get(".repo__descriptor--items").should("have.length", 4);
        cy.get(".repo__descriptor--items")
          .filter(":contains('Unbookmark')")
          .then(bookmarkedRepos => {
            // there's some formatting weirdness going on so I opted for removing all spaces,
            // returns and new lines and trim any spaces left, leaving the content itself
            const clickedReposText = clickedRepos
              .toArray()
              .map(el => el.innerText.replace(/[\n\r ]+/g, "").trim());
            const bookmarkedReposText = bookmarkedRepos
              .toArray()
              .map(el => el.innerText.replace(/[\n\r ]+/g, "").trim());
            expect(clickedReposText).to.deep.eq(bookmarkedReposText);
          });
      });
  });
});
