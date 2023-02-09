import {
  getPageInformation,
  setCurrency,
  setPlanDuration,
  setRentalPlan,
  validatePlanPricing,
  getPlanCard
} from "../utils"

const currencyInfo = [
  {
    currencySymbol: '$',
    currencyCode: 'usd',
    label: '$ USD'
  },
  {
    currencySymbol: '€',
    currencyCode: 'eur',
    label: '€ EUR'
  },
  {
    currencySymbol: '£',
    currencyCode: 'gbp',
    label: '£ GBP'
  },
];

const pricing = {
  usd: {
    Starter: {
      planFinalPricing: 64,
      planOriginalPricing: 92,
      isDiscounted: true
    },
    Professional: {
      planFinalPricing: 375,
      planOriginalPricing: 536,
      isDiscounted: true
    },
    Ultimate: {
      planFinalPricing: 525,
      planOriginalPricing: 741,
      isDiscounted: true
    }
  },
  eur: {
    Starter: {
      planFinalPricing: 60,
      planOriginalPricing: 85,
      isDiscounted: true
    },
    Professional: {
      planFinalPricing: 330,
      planOriginalPricing: 472,
      isDiscounted: true
    },
    Ultimate: {
      planFinalPricing: 466,
      planOriginalPricing: 666,
      isDiscounted: true
    }
  },
  gbp: {
    Starter: {
      planFinalPricing: 51,
      planOriginalPricing: 73,
      isDiscounted: true
    },
    Professional: {
      planFinalPricing: 294,
      planOriginalPricing: 420,
      isDiscounted: true
    },
    Ultimate: {
      planFinalPricing: 414,
      planOriginalPricing: 592,
      isDiscounted: true
    }
  }
};

describe('Pricing Page', () => {
  var pageInformation;
  before(() => {

    pageInformation = getPageInformation('Pricing');
    cy.visit(pageInformation.route);
  });
  it('Should have the correct title', () => {
    cy.title().should('include', pageInformation.title);
  });

  // The values for listing at the moment are hard coded we might want to intercept them in an API if that is needed for more flexibility 
  context('Check USD Plans Pricing - 50 listings', () => {
    it('Should be able to set the currency, rental duration and rental properties', () => {
      setCurrency();
      setPlanDuration('Yearly');
      setRentalPlan();
    });
    Object.entries(pricing.usd).forEach(([planName, planDetails]) => {
      it(`Should be able to test plan pricing for ${planName}`, () => {
        validatePlanPricing(
          planName,
          planDetails.planFinalPricing,
          planDetails.planOriginalPricing,
          planDetails.isDiscounted,
          '$'
        )
      });

      it(`Should validate Plan Card Structure ${planName}`, () => {
        getPlanCard(planName).within(($card) => {
          cy.contains('Get Started')
            .invoke('attr', 'href')
            .should('eq', 'https://www.lodgify.com/signup');
          cy.get('.plan-feature-lists li').should('have.length.least', 1);
        })
      });
    })
  })
  context('Check Change Currency Affect Plans Pricing - 50 listings', () => {
    it(`Should be able to change currency to`, () => {
      var selectedCurrency;
      const filteredCurrency = currencyInfo.filter(currency => currency.currencyCode != 'usd');
      selectedCurrency = Cypress._.sample(filteredCurrency);
      setCurrency(selectedCurrency.label);
      setPlanDuration('Yearly');
      setRentalPlan();
      const planName = 'Starter';
      const plan = pricing[selectedCurrency.currencyCode][planName];
      validatePlanPricing(
        planName,
        plan.planFinalPricing,
        plan.planOriginalPricing,
        plan.isDiscounted,
        selectedCurrency.currencySymbol
      )
    });
  })
})