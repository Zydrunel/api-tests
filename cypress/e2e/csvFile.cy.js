/// <reference types="cypress" />

const usersTable = Cypress.env("usersTable");

describe("create a user with an API call", async () => {
  usersTable.forEach((user) => {
    it(`creates and verifies a user ${user.name} successfully`, function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: user.name,
          job: user.job,
        },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response).to.have.property("headers");
        expect(response.body).property("id").to.be.a("string");
        expect(response.body).property("createdAt").to.be.a("string");
        expect(response.body).property("name").to.equal(user.name);
        expect(response.body).property("job").to.equal(user.job);
      });
    });
  });
});
