describe('Navigation', () => {
  it('loads the Studio page and shows the main heading', () => {
    cy.visit('/');
    cy.contains('h2', 'Create Your Scene').should('be.visible');
  });

  it('clicking the Studio nav tab from another page navigates back to / and renders the heading', () => {
    cy.visit('/history');
    cy.contains('a', 'Studio').click();
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.contains('h2', 'Create Your Scene').should('be.visible');
  });
  
  it('clicking the Stock Footage nav tab navigates to /stock-footage and renders the heading', () => {
    cy.visit('/');
    cy.contains('a', 'Stock Footage').click();
    cy.url().should('include', '/stock-footage');
    cy.contains('h2', 'Stock Footage Generator').should('be.visible');
  });

  it('clicking the History nav tab navigates to /history and renders the heading', () => {
    cy.visit('/');
    cy.contains('a', 'History').click();
    cy.url().should('include', '/history');
    cy.contains('h2', 'Video History').should('be.visible');
  });

  it('the Studio page loads without console errors', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });
    cy.contains('h2', 'Create Your Scene').should('be.visible');
    cy.get('@consoleError').should('not.have.been.called');
  });

  it('the Stock Footage page loads without console errors', () => {
    cy.visit('/stock-footage', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });
    cy.contains('h2', 'Stock Footage Generator').should('be.visible');
    cy.get('@consoleError').should('not.have.been.called');
  });

  it('the History page loads without console errors', () => {
    cy.visit('/history', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });
    cy.contains('h2', 'Video History').should('be.visible');
    cy.get('@consoleError').should('not.have.been.called');
  });
});
