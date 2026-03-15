describe('Stock Footage', () => {
  let fixtures: { structuredScript: string };

  beforeEach(() => {
    cy.fixture('stock-footage-scripts').then((data) => {
      fixtures = data;
    });
  });

  it('submitting an empty script does not trigger a POST request to /api/stock-footage/parse-script', () => {
    cy.visit('/stock-footage');
    cy.intercept('POST', '**/api/stock-footage/parse-script').as('parseScript');
    cy.contains('button', 'Parse Script').should('be.disabled');
    cy.contains('button', 'Parse Script').click({ force: true });
    cy.wait(300);
    cy.get('@parseScript.all').should('have.length', 0);
  });

  it('the Parse Script button triggers a POST /api/stock-footage/parse-script request with the script in the payload', () => {
    cy.visit('/stock-footage');
    cy.getById('script-text').type(fixtures.structuredScript);
    cy.intercept('POST', '**/api/stock-footage/parse-script').as('parseScript');
    cy.contains('button', 'Parse Script').click();
    cy.wait('@parseScript').its('request.body').should('deep.include', {
      scriptText: fixtures.structuredScript,
    });
  });
});


