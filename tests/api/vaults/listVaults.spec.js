import { test, expect } from '@playwright/test';
import { getToken } from '../../../helpers/getToken';
import { API_ENDPOINTS } from '../../../helpers/apiEndpoints';

const endpointListVaults = API_ENDPOINTS.vaults.listVaults;
let vaults = [];

test.beforeAll('Get Vaults List', async ({ request }) => {
  const token = getToken();

  const res = await request.get(endpointListVaults, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const postAPIResponseBody = await res.json();
  // console.log(postAPIResponseBody.data.items[0]);

  // postAPIResponseBody.data.items.forEach((vault, index) => {
  // console.log(`Vault ${index + 1}:`, vault);});

  expect(res.status()).toBe(200);
  expect(postAPIResponseBody).toHaveProperty('data.items');
  expect(Array.isArray(postAPIResponseBody.data.items)).toBe(true);

  vaults = postAPIResponseBody.data.items;

});


test('Each vault should have non-empty id, name, and networkType === "TEST"', () => {
  for (const [i, item] of vaults.entries()) {
    expect.soft(typeof item.id, `Vault[${i}].id should be a string`).toBe('string');
    expect.soft(item.id.length, `Vault[${i}].id should not be empty`).toBeGreaterThan(0);

    expect.soft(typeof item.name, `Vault[${i}].name should be a string`).toBe('string');
    expect.soft(item.name.trim(), `Vault[${i}].name should not be empty`).not.toBe('');


  }
});

test('Each vault should have a valid vaultType', () => {
  const allowedTypes = ['GENERAL', 'SMART', 'AUTOMATION'];

  for (const [i, item] of vaults.entries()) {
    expect.soft(item).toHaveProperty('vaultType');
    expect.soft(allowedTypes, `Vault[${i}].vaultType should be valid`).toContain(item.vaultType);
  }
});






