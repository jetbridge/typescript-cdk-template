/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable {
        /**
         * Command to select DOM element by data-cy attribute.
         * @example cy.dataCy('submit')
         */
        dataCy(element: string): Chainable<Element>
    }
}
