import { test, expect } from '@playwright/test';

const mockCustomerData = {
    id: '12345',
    name: 'Mocked Customer',
    email: 'mocked.customer@example.com',
};

test.describe('Customer API Tests with Mock', () => {
    test.beforeEach(async ({ page }) => {
        // Mock the create customer endpoint
        await page.route('**/customers', (route) => {
            if (route.request().method() === 'POST') {
                route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify(mockCustomerData),
                });
            } else {
                route.continue();
            }
        });

        // Mock the update customer endpoint
        await page.route(`**/customers/${mockCustomerData.id}`, (route) => {
            if (route.request().method() === 'PUT') {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        ...mockCustomerData,
                        name: 'Updated Mocked Customer',
                    }),
                });
            } else {
                route.continue();
            }
        });
    });

    test('should create a customer with mock data', async ({ page }) => {
        const response = await page.request.post('/customers', {
            data: {
                name: 'Test Name',
                email: 'test@example.com',
            },
        });

        const data = await response.json();

        expect(response.status()).toBe(201);
        expect(data).toEqual(mockCustomerData);
    });

    test('should update a customer with mock data', async ({ page }) => {
        const response = await page.request.put(`/customers/${mockCustomerData.id}`, {
            data: {
                name: 'Updated Name',
            },
        });

        const data = await response.json();

        expect(response.status()).toBe(200);
        expect(data.name).toBe('Updated Mocked Customer');
    });
});
