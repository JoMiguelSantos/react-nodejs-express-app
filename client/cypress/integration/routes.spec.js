describe("routes", () => {
  it("renders all pages empty state", () => {
    cy.visit("/");
    cy.location().should(location => {
      expect(location.pathname).to.eq("/");
    });
    cy.contains("Repos").click();
    cy.location().should(location => {
      expect(location.pathname).to.eq("/repos");
    });
    cy.contains("There are currently no repositories saved");
    cy.contains("Bookmarks").click();
    cy.location().should(location => {
      expect(location.pathname).to.eq("/bookmarks");
    });
    cy.contains("There are currently no bookmarks saved");
    cy.contains("New Search").click();
    cy.location().should(location => {
      expect(location.pathname).to.eq("/");
    });
  });
});
