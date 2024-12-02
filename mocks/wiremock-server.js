const wiremock = require('wiremock-client');
const { startWireMockServer, stopWireMockServer } = require('wiremock-server'); // Assuming wiremock-server package is installed and used

const wiremockHost = 'http://localhost:8080';
const wiremockServer = wiremock(wiremockHost);

// Function to set up the mocks (stub mappings)
async function setupMocks() {
  // Register create-customer mapping
  await wiremockServer.registerMapping(require('./mappings/create-customer.json'));

  // Register update-customer mapping
  await wiremockServer.registerMapping(require('./mappings/update-customer.json'));

  console.log('WireMock stubs configured.');
}

// Start WireMock server
async function startWireMock() {
  console.log('Starting WireMock server...');
  await setupMocks();
}

// Stop WireMock server (optional)
async function stopWireMock() {
  console.log('Stopping WireMock server...');
  await stopWireMockServer(); // This ensures the WireMock server is properly stopped after the tests
}

module.exports = { startWireMock, stopWireMock };
