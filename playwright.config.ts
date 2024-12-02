import { defineConfig, devices } from '@playwright/test';
import { startWireMock, stopWireMock } from './mocks/wiremock-server'; // Import WireMock setup

export default defineConfig({
  testDir: './tests/functional',
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['dot'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never' }],
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000', // The base URL for your Koa API
    trace: 'on-first-retry',
  },

  // Setup WireMock before tests and cleanup after
  globalSetup: async () => {
    console.log('Setting up WireMock...');
    await startWireMock(); // Start WireMock server
  },
  globalTeardown: async () => {
    console.log('Stopping WireMock...');
    await stopWireMock(); // Stop WireMock server after tests
  },

  // Fixtures for Playwright tests
  fixtures: {
    customerData: async ({ page }, use) => {
      // Create customer using POST request
      const createResponse = await page.request.post('/customers', {
        data: {
          name: 'Test Customer',
          email: 'test@example.com',
        },
      });

      // Extract data from the response and pass it to the tests
      const customer = await createResponse.json();
      await use(customer); // Provide customer data for use in tests
    },
  },
});
