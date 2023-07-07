// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("getSingleUser", (userId) => {
  cy.request({
    method: "GET",
    url: `/api/users/${userId}`,
  }).then((response) => {
    expect(response.status).to.equal(200);

    return response.body;
  });
});
