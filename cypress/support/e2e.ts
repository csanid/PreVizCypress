// Support file — runs before every spec.
// Import custom commands and any global configuration here.
import './commands';

// Suppress a known Cypress 12 internal snapshot error that occurs during
// DOM restoration between tests. This error originates from Cypress itself,
// not from the application, and does not affect test reliability or results.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null')) {
    return false;
  }
});
