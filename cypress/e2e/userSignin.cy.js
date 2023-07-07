/// <reference types="cypress" />

describe("Login with an API call", () => {
  beforeEach(function () {
    cy.fixture("userCredentials.json").as("userCredentials");
  });

  it("logins in with a valid user successfully", function () {
    cy.request({
      method: "POST",
      url: "/api/login",
      body: {
        email: this.userCredentials.successfulLogin.email,
        password: this.userCredentials.successfulLogin.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response).to.have.property("headers");
      expect(response.body).property("token").to.be.a("string");
    });
  });

  it("fails to login with an email missing", function () {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      body: {
        password: this.userCredentials.successfulLogin.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response).to.have.property("headers");
      expect(response.body)
        .property("error")
        .to.equal("Missing email or username");
    });
  });

  it("fails to login in with a non existing user", function () {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      body: {
        email: this.userCredentials.unsuccessfulLogin.email,
        password: this.userCredentials.unsuccessfulLogin.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response).to.have.property("headers");
      expect(response.body).property("error").to.equal("user not found");
    });
  });

  it("fails to login with a password missing", function () {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      body: {
        email: this.userCredentials.successfulLogin.email,
        password: "",
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response).to.have.property("headers");
      expect(response.body).property("error").to.equal("Missing password");
    });
  });
});
