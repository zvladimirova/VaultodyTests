import { test, expect } from '@playwright/test';
import { getToken } from '../../../helpers/getToken';
import { API_ENDPOINTS } from '../../../helpers/apiEndpoints';

const endpointCreateAddress = (vaultId) => API_ENDPOINTS.addresses.createAddress(vaultId);

import { generateAddressCreateRequestBody } from '../../../test-data/vaults/addressRequestBodies';
import { blockchains } from '../../../test-data/constants/blockchains';
import { vaultIds } from '../../../test-data/constants/vaultsIds';

blockchains.forEach(blockchain => {

    test(`Create address for blockchain: ${blockchain}`, async ({ request }) => {
        const token = getToken();
        const vaultId = '653a44d4457eea0008cda917';
        const name = `My Address ${Date.now()}`;
        const requestBody = generateAddressCreateRequestBody(name, blockchain);


        const response = await request.post(endpointCreateAddress(vaultId), {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: requestBody,
        });

        const responseBody = await response.json();
        console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

        // ✅ Assertions
        expect.soft(response.status()).toBe(200); 
        expect.soft(responseBody).toHaveProperty('data.item');
        expect.soft(responseBody.data.item.id).not.toBe('');
        expect.soft(responseBody.data.item.address).not.toBe('');
        expect.soft(responseBody.data.item.name).toBe(name);
        expect.soft(responseBody.data.item.blockchain).toBe(blockchain);
        expect.soft(responseBody.data.item.type).toBe('deposit');

    });
});


test('Create address from NOT backuped vault', async ({ request }) => {
    const token = getToken();
    const vaultId = vaultIds.NOT_BACKUPED_VAULT;
    const name = `My Address ${Date.now()}`;
    const blockchain = 'bitcoin'
    const requestBody = generateAddressCreateRequestBody(name, blockchain);
    const response = await request.post(endpointCreateAddress(vaultId), {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: requestBody,
    });

    const responseBody = await response.json();
    console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

    expect.soft(response.status()).toBe(403);
    expect.soft(responseBody).toHaveProperty('error');
    expect.soft(responseBody.error.code).toBe('vault_as_a_service_vault_recovery_not_initialized');


});


