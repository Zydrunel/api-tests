/// <reference types="cypress" />

describe("Register with an API call", () => {
  beforeEach(function () {
    cy.fixture("userCredentials.json").as("userCredentials");
  });

  it("registers a new user successfully and verifies it exists", function () {
    cy.request({
      method: "POST",
      url: "/api/register",
      body: {
        email: this.userCredentials.successfulLogin.email,
        password: this.userCredentials.successfulLogin.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response).to.have.property("headers");
      expect(response.body).property("id").to.be.a("number");
      expect(response.body).property("token").to.be.a("string");

      cy.getSingleUser(response.body.id).then((userInfo) => {
        expect(userInfo)
          .property("data")
          .property("email")
          .to.equal(this.userCredentials.successfulLogin.email);
      });
    });
  });

  it("fails to register with an email missing", () => {
    cy.request({
      method: "POST",
      url: "/api/register",
      failOnStatusCode: false,
      body: {
        password: "password1",
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response).to.have.property("headers");
      expect(response.body)
        .property("error")
        .to.equal("Missing email or username");
    });
  });

  it("fails to register with password missing", function () {
    cy.request({
      method: "POST",
      url: "/api/register",
      failOnStatusCode: false,
      body: {
        email: this.userCredentials.successfulLogin.email,
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response).to.have.property("headers");
      expect(response.body).property("error").to.equal("Missing password");
    });
  });
});
