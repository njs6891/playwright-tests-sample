import { test, expect } from '@playwright/test';

test('update customer', async ({ page, customerData }) => {
  // Use the customer data to perform the update
  const updatedCustomer = await page.request.put(`/customers/${customerData.id}`, {
    data: {
      name: 'Updated Customer',
    },
  });

  const updatedCustomerData = await updatedCustomer.json();
  
  expect(updatedCustomerData.name).toBe('Updated Customer');
  expect(updatedCustomerData.id).toBe(customerData.id);
});
