import { getPageInformation, fieldErrorMessage } from "../utils"
import { faker } from '@faker-js/faker';
//we need to do more testing around country localization

describe('Contact Page', () => {
  var pageInformation;
  before(() => {
    pageInformation = getPageInformation('Contact');
    cy.visit(pageInformation.route);
  });
  it('Should have the correct title', () => {
    cy.title().should('include', pageInformation.title);
  });
  it('Should Show Error Message on Submit without Values', () => {
    cy.get('[data-testid="form"]').within(($form) => {
      cy.get('[data-testid="button"]').click();
      fieldErrorMessage('Name', true, 'Name is mandatory');
      fieldErrorMessage('Phone', true, 'Phone is mandatory');
      fieldErrorMessage('Email', true, 'Email is mandatory');
      fieldErrorMessage('Arrival', false);
      fieldErrorMessage('Departure', false);
      fieldErrorMessage('Comment', true, 'Comment is mandatory');
    });
  });

  it('Should be able to submit form with mandatory fields', () => {
    cy.get('[data-testid="form"]').within(($form) => {
      cy.get('[placeholder="Name"]').clear().type(`${faker.random.word()}`, {delay : 30});
      cy.get('[placeholder="Phone"]').clear().type(`${faker.phone.number()}`, {delay : 30});
      cy.get('[placeholder="Email"]').clear().type(`${faker.internet.email()}`, {delay : 30});
      cy.get('[placeholder="Comment"]').clear().type(`${faker.random.alphaNumeric(15)}`, {delay : 30});
    });
  });

  it('Should be able to submit form with all fields including the date picker ', () => {
    cy.get('[data-testid="form"]').within(($form) => {
      cy.get('[placeholder="Name"]').clear().type(`${faker.random.word()}`, {delay : 30});
      cy.get('[placeholder="Phone"]').clear().type(`${faker.phone.number()}`, {delay : 30});
      cy.get('[placeholder="Email"]').clear().type(`${faker.internet.email()}`, {delay : 30});
      cy.get('[placeholder="Arrival"]').click().type('14/04/2023' + '{enter}', {force: true, delay : 30});
      cy.get('[placeholder="Departure"]').type('14/06/2023' + '{enter}', {force: true, delay : 30});
      cy.get('[placeholder="Comment"]').type(`${faker.random.alphaNumeric(15)}`, {delay : 30});

    });
  })
})