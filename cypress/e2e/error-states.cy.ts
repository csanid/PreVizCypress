describe('Error States', () => {
  let fixtures: { directPrompt: string };

  beforeEach(() => {
    cy.fixture('studio-prompts').then((data) => {
      fixtures = data;
    });
  });

  it('a 500 error response from /api/generate-video is handled gracefully', () => {
    cy.visit('/');
    cy.stubGenerateVideoError(500);

    cy.get('#direct-prompt').type(fixtures.directPrompt);
    cy.contains('button', 'Generate').click();

    cy.wait('@generateVideoError');
    cy.contains('Failed').should('be.visible');
  });

  it('a network failure on /api/generate-video is handled gracefully', () => {
    cy.visit('/');
    cy.intercept('POST', '**/api/generate-video', { forceNetworkError: true }).as('generateVideoNetworkError');

    cy.get('#direct-prompt').type(fixtures.directPrompt);
    cy.contains('button', 'Generate').click();

    cy.wait('@generateVideoNetworkError');
    cy.contains('Failed to fetch').should('be.visible');

    // Assert that a retry option is available
    cy.contains('button', /start over|retry/i).should('be.visible');
  });
});
