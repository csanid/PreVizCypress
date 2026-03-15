describe('Navigation smoke test', () => {
  it('loads the Studio page and shows the main heading', () => {
    cy.visit('/');
    cy.contains('h2', 'Create Your Scene').should('be.visible');
  });
});
