describe("performs a repos search", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.spy(win, "fetch");
      }
    });
  });
  it("loads searches page with all components", () => {
    cy.contains(/name/i).click();
    cy.contains(/description/i).click();
    cy.contains(/readme/i).click();
    cy.contains(/language/i).click();
    cy.contains(/topic/i).click();
  });

  it("tries to submit an empty form", () => {
    cy.get("button")
      .contains("Search")
      .click();
    cy.contains("Please fill in at least one of the fields");
  });

  it("submits a search to the backend and loader kicks in", () => {
    cy.fillAndSubmitForm(
      "deep learning",
      "machine learning",
      "tensorflow",
      "python",
      "ai"
    );
    cy.contains(/searching repos/i);
  });

  it("fires fetch with correct params and changes page to /repos", () => {
    cy.fillAndSubmitForm(
      "deep learning",
      "machine learning",
      "tensorflow",
      "python",
      "ai"
    );
    cy.window()
      .its("fetch")
      .should(
        "be.calledWith",
        "http://localhost:4000/api/v1/repos?name=deep learning&description=machine learning&readme=tensorflow&language=python&topic=ai"
      );
    cy.location().should(location => {
      expect(location.pathname).to.eq("/repos");
    });
    cy.get("[data-cy=repos]")
      .children()
      .should("have.length.greaterThan", 0);
  });
});
