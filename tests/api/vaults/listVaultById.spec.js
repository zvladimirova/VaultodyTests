import { test, expect } from '@playwright/test';
import { getToken } from '../../../helpers/getToken';
import { API_ENDPOINTS } from '../../../helpers/apiEndpoints';

const endpointListByVaultId = (id) => API_ENDPOINTS.vaults.listByVaultId(id);
let item;
let balances;

test.beforeAll('Get Vault by ID', async ({ request }) => {
    test.setTimeout(60000);

    const token = getToken();
    const vaultId = '652674a3b6b3990007dbca8d'; // Replace with the actual vault ID you want to test

    const res = await request.get(endpointListByVaultId(vaultId), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const postAPIResponseBody = await res.json();

    expect(res.status()).toBe(200);
    expect(postAPIResponseBody).toHaveProperty('data.item');

    item = postAPIResponseBody.data.item;

});

test('Validate vault metadata', () => {
    expect(item).toHaveProperty('id');
    expect(item.id).toBe('652674a3b6b3990007dbca8d');

    expect(item).toHaveProperty('name');
    expect(item.name).toBe('TestZori  Doge NOOOO');

    expect(item).toHaveProperty('type');
    expect(item.type).toBe('TEST');

    expect(item).toHaveProperty('color');
    expect(typeof item.color).toBe('string');

    expect(item).toHaveProperty('balances');
    balances = item.balances;

    // Add more assertions as needed

});