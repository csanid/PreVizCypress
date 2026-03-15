# Pre-Viz Engine — Cypress Test Suite

## Context
You are helping a senior QA engineer build a Cypress test suite for Pre-Viz Engine, 
a web app that generates pre-visualization videos using AI for an ad software company. 
The suite is being built incrementally. Tests will be reviewed and committed manually 
after each step.

## Tech stack
- Cypress with TypeScript
- Base URL: https://previz-engine-m1mm9ayva-valid.vercel.app/
- No authentication — session identity is managed via a browser cookie (previz_user_id)

## App structure
Three pages accessible via top navbar:
- Studio (/): Direct prompt video generation
- Stock Footage (/stock-footage): AI script parser + multi-shot video generation  
- History (/history): Video history scoped by cookie, plus All Videos tab

## Project structure
cypress/
  e2e/
    navigation.cy.ts
    studio.cy.ts
    stock-footage.cy.ts
    history.cy.ts
    error-states.cy.ts
    ai-behavior.cy.ts
  fixtures/
    generate-video-success.json
    generate-video-error.json
    parse-script-success.json
  support/
    commands.ts
    e2e.ts

## Selectors
The app has no data-testid attributes. Use the following selector strategy in priority order:
1. Semantic HTML attributes: id, type, for (e.g. #direct-prompt, #num-videos)
2. ARIA labels and roles
3. Text content with cy.contains() for buttons and headings
4. CSS classes only as a last resort and only for stable layout classes

## Custom commands (define in support/commands.ts)
- cy.getById(id): shorthand for cy.get('#' + id)
- cy.getByLabel(label): get form element by its associated label text
- cy.stubGenerateVideo(fixture): intercept POST /generate-video with a fixture
- cy.stubParseScript(fixture): intercept POST /parse-script (or equivalent) with a fixture

## Key element IDs found in source
- #direct-prompt — Studio textarea
- #num-videos — number of videos input

## Heading selectors
- Use cy.contains('h2', 'text') for page heading assertions.

## API endpoints (observed via DevTools)
- POST /api/generate-video — triggers video generation
- GET /api/video-status?taskId=... — polls generation status
- Cookie: previz_user_id — identifies user session

## Cypress best practices to follow
- baseUrl in cypress.config.ts
- Test data in fixtures, never hardcoded in tests
- Custom commands for repeated interactions
- Each test must be fully independent — no shared state between tests
- Use cy.intercept() aliases and cy.wait('@alias') for network assertions
- One describe block per feature area per file
- Clear descriptive test names that read as plain English sentences

## Constraints
- Do NOT use data-testid selectors (app has none)
- Do NOT commit anything — the engineer commits manually after review
- Do NOT generate more than one spec file per prompt
- Always show the full file content, not just diffs