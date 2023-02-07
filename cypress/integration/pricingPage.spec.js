import { getPageInformation, setCurrency, setPlanDuration, setRentalPlan, validatePlanPricing } from "../utils"

const currencyInfo = [
  {
    currencySymbol: '$',
    currencyCode: 'usd'
  },
  {
    currencySymbol: '€',
    currencyCode: 'eur'
  },
  {
    currencySymbol: '£',
    currencyCode: 'gbp'
  },
];

const pricing = {
  usd: {
    Starter: {
      planFinalPricing: 64,
      planOriginalPricing: 64,
      isDiscounted: false
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
      planFinalPricing: 64,
      planOriginalPricing: 64,
      isDiscounted: false
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
  gbp: {
    Starter: {
      planFinalPricing: 64,
      planOriginalPricing: 64,
      isDiscounted: false
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
  }
};

describe('Pricing Page', () => {
  var pageInformation;
  var selectedCurrency;
  before(() => {
    pageInformation = getPageInformation('Pricing');
    cy.visit(pageInformation.route);
  });
  it('Should have the correct title', () => {
    cy.title().should('include', pageInformation.title);
  });
  //The values for listing at the moment are hard coded we might want to intercept them in an API if that is needed for more flexibility 
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
    })
  })
  context('Check Change Currency Affect Plans Pricing - 50 listings', () => {
    before(() => {
      const filteredCurrency = currencyInfo.filter((currency) => {
        currency.currencyCode != 'usd'
      });
      selectedCurrency = Cypress._.sample(filteredCurrency);
    });
    it(`Should be able to change currency to ${selectedCurrency.upperCase()}`, () => {
      setCurrency(selectedCurrency);
      setPlanDuration('Yearly');
      setRentalPlan();
    });
  })
})