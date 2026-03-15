# Pre-Viz Engine — Cypress Test Suite

End-to-end tests for [Pre-Viz Engine](https://previz-engine-m1mm9ayva-valid.vercel.app/), a web app that generates pre-visualization videos using AI.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Google Chrome](https://www.google.com/chrome/) (tests run in Chrome by default)
- npm (bundled with Node.js)

## Setup

```bash
git clone <repo-url>
cd PreVizCypress
npm install
```

No environment variables or additional configuration required. The base URL is set in [cypress.config.ts](cypress.config.ts).

## Running Tests

### Interactive mode (Cypress UI)

Opens the Cypress Test Runner where you can select and watch individual specs run:

```bash
npm run cy:open
```

### Headless mode (CI / command line)

Runs all specs in Chrome without a UI and outputs results to the terminal:

```bash
npm run cy:run
```

### Run a single spec file

```bash
npx cypress run --browser chrome --spec "cypress/e2e/studio.cy.ts"
```

## Project Structure

```
cypress/
  e2e/
    navigation.cy.ts      # Top navbar and page routing
    studio.cy.ts          # Studio page: direct prompt video generation
    stock-footage.cy.ts   # Stock Footage page: script parsing & multi-shot generation
    history.cy.ts         # History page: per-user and all-videos views
    error-states.cy.ts    # Network and API error handling
    ai-behavior.cy.ts     # AI-driven generation behavior
  fixtures/
    generate-video-success.json   
    generate-video-error.json     
    parse-script-success.json    
  support/
    commands.ts           
    e2e.ts                
cypress.config.ts         # Cypress configuration (baseUrl, etc.)
```
