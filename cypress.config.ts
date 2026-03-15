import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://previz-engine-m1mm9ayva-valid.vercel.app/',
    setupNodeEvents(on, config) {},
  },
});