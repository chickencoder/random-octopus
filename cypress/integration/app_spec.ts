// My minimal testing strategy is to ensure that the functional
// parts of the application work as expected.

describe("Test UI renders data from API call", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should return the top 30 trending repos", () => {
    cy.get(".card").should("have.length", 30);
  });

  it("should display a favourite button for each repo", () => {
    cy.get(".card").find(".favourite-button");
  });
});

describe("Test favourite button", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display a checkbox for toggling", () => {
    cy.get(".filter-checkbox");
  });

  it("should favourite and unfavourite a repo when a button is clicked twice", () => {
    cy.get(".favourite-button").first().click();
    cy.get(".filter-checkbox").click();
    cy.get(".card").should("have.length", 1);

    cy.get('.favourite-button[aria-pressed="true"]').first().click();
    cy.get(".card").should("have.length", 0);
  });

  it("should filter cards if a language is selected", () => {
    cy.fixture("languages").then((languages) => {
      for (const language of languages) {
        cy.get(".language-select").select(language.value);
        cy.get(".card--language").should("contain", language.label);
      }
    });
  });
});

export {};
