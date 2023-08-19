/**
 *   Showstopper features for smoke testing:
 *
 *      If a user can't...
 *
 *          - register as account user and login
 *          - register as guest user and login
 *
 *          - create a new match and register and join lobby
 *          - register to a existing match and join lobby
 *          - unregister from match and leave lobby
 *
 *      ...then app requirements are not met
 *
 */

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register as guest user and login", () => {
    cy.visitAndCheck("/");

    cy.findByText(/Play as guest/i).click();

    cy.then(() => ({})).as("user");

    // By logging-in matchmaking should be available

    cy.findByRole("button", { name: /create/i }).click();
    // cy.findByRole("button", { name: /Join with key/i }).click();
  });

  it("should allow you to signup", () => {
    const signupForm = {
      username: "test",
      password: "test-password",
    };

    cy.then(() => ({ username: signupForm.username })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /username+/i }).type(signupForm.username);
    cy.findByRole("textbox", { name: /password+/i }).type(signupForm.password);

    cy.findByRole("button", {name: /submit/i}).click()
    cy.findByRole("button", { name: /logout/i }).click();
    
    cy.findByRole("link", { name: /sign up/i }).click();
    cy.findByRole("button", { name: /cancel/i }).click();

  });

  //TODO: Replace notes logic with create match logic

  // it("should allow you to create a match", () => {
  // })

});
