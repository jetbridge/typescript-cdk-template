/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

Cypress.Commands.add('dataCy', element => {
    return cy.get(`[data-cy=${element}]`)
})