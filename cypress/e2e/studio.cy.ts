describe('Studio', () => {
  let fixtures: { directPrompt: string };

  beforeEach(() => {
    cy.fixture('studio-prompts').then((data) => {
      fixtures = data;
    });
  });

  it('the prompt textarea accepts text input', () => {
    cy.visit('/');
    cy.getById('direct-prompt').type('A cinematic test shot');
    cy.getById('direct-prompt').should('have.value', 'A cinematic test shot');
  });

  it('the number of videos field does not accept alphabetic input', () => {
    cy.visit('/');
    cy.getById('num-videos').clear().type('abc');
    cy.getById('num-videos').should('not.have.value', 'abc');
  });

  it('the number of videos field does not accept values below 1', () => {
    cy.visit('/');
    cy.getById('num-videos').type('{downArrow}{downArrow}{downArrow}');
    cy.getById('num-videos').should('have.value', '1');
  });

  it('the number of videos field does not accept values above 5', () => {
    cy.visit('/');
    cy.getById('num-videos').type('{upArrow}{upArrow}{upArrow}');
    cy.getById('num-videos').should('have.value', '5');
  });

  it('submitting with an empty prompt does not trigger a POST request to /generate-video', () => {
    cy.visit('/');
    cy.intercept('POST', '**/api/generate-video').as('generateVideo');
    cy.contains('button', 'Generate').should('be.disabled');
    cy.contains('button', 'Generate').click({ force: true });
    // Brief settle time, then assert no request was fired
    cy.wait(300);
    cy.get('@generateVideo.all').should('have.length', 0);
  });

  it('the generate button triggers a POST /generate-video request with the correct payload', () => {
    cy.visit('/');
    cy.intercept('POST', '**/api/generate-video').as('generateVideo');

    cy.getById('direct-prompt').type(fixtures.directPrompt);
    cy.getById('num-videos').type('{downArrow}{downArrow}');
    cy.contains('label', 'Video Duration').parent().find('select').select('4');
    cy.contains('label', 'Aspect Ratio').parent().find('select').select('portrait');
    // Pro toggle is off by default — leave it off

    cy.contains('button', 'Generate').click();

    // Assert payload without waiting for generation to complete
    cy.wait('@generateVideo').its('request.body').should('deep.include', {
      aspectRatio: 'portrait',
      pro: false,
      prompt: fixtures.directPrompt,
      seconds: '4',
    });
  });
});
