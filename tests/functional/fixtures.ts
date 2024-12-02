import { test as base, expect, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Define a custom fixture
type CustomFixtures = {
    customerFixture: { id: string; name: string; email: string };
};

const test = base.extend<CustomFixtures>({
    customerFixture: async ({}, use) => {
        // Set up a customer via API before running the tests
        const apiContext = await request.newContext({ baseURL: 'http://localhost:3000' });
        const response = await apiContext.post('/customers', {
            data: { name: 'John Doe', email: 'john.doe@example.com' },
        });
        const customer = await response.json();

        // Save customer data to a fixture file
        const fixturePath = path.join(__dirname, './fixtures/customer.json');
        fs.writeFileSync(fixturePath, JSON.stringify(customer));

        // Provide the fixture for tests
        await use(customer);

        // Clean up after the tests
        await apiContext.delete(`/customers/${customer.id}`);
    },
});

export { test, expect };
