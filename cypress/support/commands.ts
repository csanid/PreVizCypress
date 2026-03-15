// Required to make this file a module so that `declare global` works
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      stubGenerateVideo(fixture: string): void;
      stubGenerateVideoError(statusCode: number): void;
    }
  }
}

Cypress.Commands.add('stubGenerateVideo', (fixture: string) => {
  cy.intercept('POST', '**/api/generate-video', { fixture }).as('generateVideo');
});

Cypress.Commands.add('stubGenerateVideoError', (statusCode: number) => {
  cy.intercept('POST', '**/api/generate-video', {
    statusCode,
    body: '',
  }).as('generateVideoError');
});
