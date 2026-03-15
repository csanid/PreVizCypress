// Required to make this file a module so that `declare global` works
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getById(id: string): Chainable<JQuery<HTMLElement>>;
      getByLabel(label: string): Chainable<JQuery<HTMLElement>>;
      stubGenerateVideo(fixture: string): void;
      stubGenerateVideoError(statusCode: number): void;
      stubParseScript(fixture: string): void;
      stubNetworkError(endpoint: string): void;
    }
  }
}

Cypress.Commands.add('getById', (id: string) => {
  return cy.get(`#${id}`);
});

Cypress.Commands.add('getByLabel', (label: string) => {
  return cy.contains('label', label).invoke('attr', 'for').then((id) => cy.get(`#${id}`));
});

Cypress.Commands.add('stubGenerateVideo', (fixture: string) => {
  cy.intercept('POST', '**/api/generate-video', { fixture }).as('generateVideo');
});

Cypress.Commands.add('stubGenerateVideoError', (statusCode: number) => {
  cy.intercept('POST', '**/api/generate-video', {
    statusCode,
    body: '',
  }).as('generateVideoError');
});

Cypress.Commands.add('stubParseScript', (fixture: string) => {
  cy.intercept('POST', '**/api/stock-footage/parse-script', { fixture }).as('parseScript');
});

Cypress.Commands.add('stubNetworkError', (endpoint: string) => {
  cy.intercept('POST', endpoint, { forceNetworkError: true }).as('networkError');
});
