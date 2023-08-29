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

  it("should allow you to signup and login", () => {
    const signupForm = {
      username: "test",
      password: "test-password"
    };

    cy.then(() => ({ username: signupForm.username })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /username+/i }).type(signupForm.username);
    cy.findByRole("textbox", { name: /password+/i }).type(signupForm.password);

    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();

    cy.findByRole("link", { name: /sign up/i }).click();
    cy.findByRole("button", { name: /cancel/i }).click();

    cy.findByRole("link", { name: /login/i }).click();
    cy.findByRole("textbox", { name: /username+/i }).type(signupForm.username);
    cy.findByRole("textbox", { name: /password+/i }).type(signupForm.password);
    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByRole("button", { name: /logout/i }).click();
  });

  it("should allow you to login as guest user (w/o sign up)", () => {
    cy.visitAndCheck("/");

    cy.findByText(/Play as guest/i).click();

    cy.then(() => ({})).as("user");

    cy.findByRole("button", { name: /logout/i }).should("exist");
  });

  it("should allow you to create a new match", () => {
    cy.login();

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /create/i }).click();

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(/lobby/i).should("exist");
  });

  // it("should allow you join a match", () => {
  //   cy.login();

  //   cy.visitAndCheck("/");

  //   cy.findByRole("link", { name: /join/i }).click();

  //   cy.findByRole("button", { name: /submit/i }).click();

  //   cy.findByText(/lobby/i).should("exist");
  // })
});
