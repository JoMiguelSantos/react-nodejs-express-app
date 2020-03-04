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
    cy.contains(/name/i)
      .children()
      .click()
      .type("react");
    cy.contains(/description/i)
      .children()
      .click()
      .type("react redux");
    cy.contains(/readme/i)
      .children()
      .click()
      .type("api http");
    cy.contains(/language/i)
      .children()
      .click()
      .type("javascript");
    cy.contains(/topic/i)
      .children()
      .click()
      .type("server side rendering");
    cy.get("button")
      .contains("Search")
      .click();
    cy.contains(/searching repos/i);
  });

  it("fires fetch with correct params and changes page to /repos", () => {
    cy.contains(/name/i)
      .click()
      .type("react");
    cy.get("button")
      .contains("Search")
      .click();
    cy.window()
      .its("fetch")
      .should("be.calledWith", "http://localhost:4000/api/v1/repos?name=react");
    cy.location().should(location => {
      expect(location.pathname).to.eq("/repos");
    });
    cy.get("[data-cy=repos]")
      .children()
      .should("have.length.greaterThan", 0);
  });
});
