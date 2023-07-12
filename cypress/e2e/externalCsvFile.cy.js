/// <reference types="cypress" />
const neatCsv = require("neat-csv");
let data;

describe("create a user with an API call", async () => {
  before(() => {
    cy.request({
      method: "GET",
      url: "https://api.github.com/repos/Zydrunel/test_data/contents/users.csv",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer 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",
      },
    })
      .then((sshresponse) => atob(sshresponse.body.content))
      .then(neatCsv)
      .then((responseJson) => {
        data = responseJson;
      });
  });
  it(`creates and verifies a user successfully`, function () {
    data.forEach((user) => {
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
