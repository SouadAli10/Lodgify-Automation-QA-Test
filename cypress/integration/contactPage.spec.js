import { getPageInformation } from "../utils"

describe('Contact Page', () => {
    before(() => {
        var pageInformation = getPageInformation('Contact');
        cy.visit(pageInformation.route);
    });
    it('Should have the correct title', () => {
        cy.title().should('include', pageInformation.title);
    });
    context('Check Form Values Validation', () => {
        it('Check Error Message on Submit without Values', () => {
          cy.get('[data-testid="form"]').within(($form) => {
            cy.get('[data-testid="button]').click();
          });
        });
    })
})