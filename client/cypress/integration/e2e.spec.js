describe("end to end testing", () => {
  it("completes a user journey", () => {
    cy.visit("/");

    // fill in form and click search
    cy.fillAndSubmitForm("react", "redux", "api", "javascript", "web");

    // bookmark 4 random repos
    cy.get(".repo__descriptor--items").each((repo, index, repos) => {
      // pseudo random order of non consecutive bookmarking
      if (index < 16 && index % 5 === 0) {
        cy.get(repo)
          .contains("Bookmark")
          .click();
      }
    });
    cy.get(".repo__descriptor--items")
      .filter(":contains('Unbookmark')")
      .should("have.length", 4);

    cy.contains("Unbookmark").click();
    cy.get(".repo__descriptor--items")
      .filter(":contains('Unbookmark')")
      .should("have.length", 3);

    cy.contains("Bookmarks").click();
    cy.get(".repo__descriptor--items").should("have.length", 3);

    cy.contains("Unbookmark").click();
    cy.get(".repo__descriptor--items").should("have.length", 2);

    cy.contains("New Search").click();

    // submit form again with different text
    cy.fillAndSubmitForm(
      "deep learning",
      "machine learning",
      "tensorflow",
      "python",
      "ai"
    );

    // bookmark 4 random repos
    cy.get(".repo__descriptor--items").each((repo, index, repos) => {
      // pseudo random order of non consecutive bookmarking
      if (index < 16 && index % 5 === 0) {
        cy.get(repo)
          .contains("Bookmark")
          .click();
      }
    });
    cy.get(".repo__descriptor--items")
      .filter(":contains('Unbookmark')")
      .should("have.length", 4);

    cy.contains("Unbookmark").click();
    cy.get(".repo__descriptor--items")
      .filter(":contains('Unbookmark')")
      .should("have.length", 3);

    // check if the bookmarks accumulate from the previous bookmarked
    cy.contains("Bookmarks").click();
    cy.get(".repo__descriptor--items").should("have.length", 5);

    cy.contains("Unbookmark").click();
    cy.get(".repo__descriptor--items").should("have.length", 4);
  });
});
