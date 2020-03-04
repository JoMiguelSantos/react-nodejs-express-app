describe("end to end testing", () => {
  it("completes a user journey", () => {
    cy.visit("/");

    // fill in form and click search
    cy.contains(/name/i)
      .children()
      .as("nameInput")
      .click()
      .type("react");
    cy.contains(/description/i)
      .children()
      .click()
      .as("descriptionInput")
      .type("redux");
    cy.contains(/readme/i)
      .children()
      .click()
      .as("readmeInput")
      .type("api");
    cy.contains(/language/i)
      .children()
      .click()
      .as("languageInput")
      .type("javascript");
    cy.contains(/topic/i)
      .children()
      .click()
      .as("topicInput")
      .type("web");
    cy.get("button")
      .contains("Search")
      .as("searchButton")
      .click();

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
    cy.contains(/name/i)
      .children()
      .click()
      .type("deep learning");
    cy.contains(/description/i)
      .children()
      .click()
      .type("machine learning");
    cy.contains(/readme/i)
      .children()
      .click()
      .type("tensorflow");
    cy.contains(/language/i)
      .children()
      .click()
      .type("python");
    cy.contains(/topic/i)
      .children()
      .click()
      .type("ai");
    cy.get("button")
      .contains("Search")
      .click();

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
