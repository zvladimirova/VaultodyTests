import { test, expect } from '@playwright/test';
import { getToken } from '../../../helpers/getToken';
import { API_ENDPOINTS } from '../../../helpers/apiEndpoints';
const endpointCreateVault = API_ENDPOINTS.vaults.createVault;
const endpointUpdateVault = (vaultId) => API_ENDPOINTS.vaults.updateVault(vaultId);

import { generateVaultCreateRequestBody } from '../../../test-data/vaults/vaultRequestBodies'; 
import {updateVaultRequestBody} from '../../../test-data/vaults/vaultRequestBodies';

test('Create a new vault ', async ({ request }) => {
  const token = getToken();
  const uniqueName= `Vault ${Date.now()}`;
  const requestBody = generateVaultCreateRequestBody(uniqueName);


  const response = await request.post(endpointCreateVault, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });

  const responseBody = await response.json();
  console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

  // ✅ Assertions
  expect.soft(response.status()).toBe(200); // or 200 if applicable
  expect.soft(responseBody).toHaveProperty('data.item');
  expect.soft(responseBody.data.item.name).toBe(uniqueName);
  expect.soft(responseBody.data.item.type).toBe('TEST');
  expect.soft(responseBody.data.item.vaultType).toBe('GENERAL');
});


test('Update a vault ', async ({ request }) => {
  const token = getToken();
  const vaultId = '653a44e9457eea0008cda918';
  const uniqueName= `Vault ${Date.now()}`;
  const requestBody = updateVaultRequestBody(uniqueName);
  

  const response = await request.patch(endpointUpdateVault(vaultId), {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });

  const responseBody = await response.json();
  console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

  // ✅ Assertions
  expect.soft(response.status()).toBe(200); // or 200 if applicable
  expect.soft(responseBody).toHaveProperty('data.item');
  expect.soft(responseBody.data.item.name).toBe(uniqueName);
  expect.soft(responseBody.data.item.type).toBe('TEST');
  expect.soft(responseBody.data.item.vaultType).toBe('GENERAL');

});