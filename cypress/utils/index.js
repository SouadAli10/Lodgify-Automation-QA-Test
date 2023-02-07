import { pageRoutes } from "./routes";

export const getPlanCard = (plan) => {
    return cy.get('.price-item').contains(plan);
}
export const validatePlanPricing = (plan, finalPricing, originalPricing, discount = false, currency = '$') => {
    getPlanCard(plan).within(($card) => {
        cy.get('.currency.currency-symbol').contains(currency);
        cy.get('.total-sum').contains(finalPricing);
        if (discount) {
            cy.get('.discount-number').contains(originalPricing);
        }
    });
}

export const setRentalPlan = (rentalNumber = 50) => {
    cy.get('#scroll-prop-plan').clear().type(rentalNumber);
    cy.get('.slider-handle.min-slider-handle')
        .invoke('attr', 'aria-valuenow')
        .should('eq', rentalNumber);
}

export const setCurrency = (currency = 'usd') => {
    cy.get('.price-currency-select').select(currency);
}

export const setPlanDuration = (period) => {
    cy.get('li')
        .should('have.attr', 'data-price-period')
        .contains(period)
        .click()
        .should('have.class', 'active');
}

// If we have more forms this might be cool to convert it into a page object model 
export const fieldErrorMessage = (placeholder, exist, errorMessage) => {
    const field = cy.get(`[placeholder='${placeholder}']`)
        .parent()
        .should(exist ? 'have.class' : 'not.have.class', 'error');
    exist
        ? field.contains(errorMessage)
        : field;
}

export const getPageInformation = (page) => {
    return pageRoutes[page];
}