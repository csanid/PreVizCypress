describe('History', () => {
  it('the Your Videos tab shows an empty state for a fresh cookie', () => {
    cy.clearCookie('previz_user_id');
    cy.visit('/history');
    // Your Videos is the default active tab — no click needed
    cy.contains('You haven\'t generated any videos yet').should('be.visible');
  });

  it('the All Videos tab renders at least one video card', () => {
    cy.visit('/history');
    cy.contains('button', 'All Videos').click();
    // Video cards display duration info — match any card showing "N seconds"
    cy.contains(/\d+s/).should('be.visible');
  });
});
