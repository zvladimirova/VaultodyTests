import { test, expect } from '@playwright/test';
import { getToken, commonHeaders } from '../../../helpers/getToken';
import { API_ENDPOINTS } from '../../../helpers/apiEndpoints';
import { utxoTransactionRequestBody } from '../../../test-data/vaults/transactionRequestBodies';
const endpointCreateUTXOTransaction = (vaultID) => API_ENDPOINTS.transactions.createUTXOTransaction(vaultID);

const token = getToken();
const headers = commonHeaders(token);
const vaultId = '6527a0d1b6b3990007dbcaa0';
const blockchain = 'bitcoin';

test('Create Bitcoin Transaction with one recipient', async ({ request }) => {
    const recipients = [
        {
            address: 'tb1qjm48rdmxn62hn534czeucgnm4lvszfxun7a00f',
            amount: '0.00000546'
        }
    ];

    const requestBody = utxoTransactionRequestBody(blockchain, recipients);

    const response = await request.post(endpointCreateUTXOTransaction(vaultId), {
        headers,
        data: requestBody,
    });

    const responseBody = await response.json();
    // console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

    console.log('=== Raw Response Text ===');
    console.log(await response.text());

    console.log('=== Parsed Response Body ===');
    console.dir(responseBody, { depth: null, colors: true });

    // ✅ Assertions
    expect(response.status()).toBe(200); 
    expect.soft(responseBody).toHaveProperty('data.item');
    expect.soft(responseBody.data.item.id).not.toBe(' ');
    expect.soft(responseBody.data.item.blockchain).toBe(blockchain);
    expect.soft(responseBody.data.item.network).toBe('testnet');
    expect.soft(responseBody.data.item.amount).toBe('0.00000546');
    expect.soft(responseBody.data.item.note).toBe('myNote');
    expect.soft(responseBody.data.item.prepareStrategy).toBe('OPTIMIZE_SIZE');
    expect.soft(responseBody.data.item.recipients[0].address).toBe('tb1qjm48rdmxn62hn534czeucgnm4lvszfxun7a00f');
    expect.soft(responseBody.data.item.recipients[0].amount).toBe('0.00000546');
});

test('Create Bitcoin Transaction with 3 recipients', async ({ request }) => {

    const recipients = [
        {
            address: 'tb1qjm48rdmxn62hn534czeucgnm4lvszfxun7a00f',
            amount: '0.00000546'
        },
        {
            address: 'tb1qvn80fllc3gdpdv78gcrnjcu0dshxnksze5juhz',
            amount: '0.00000547'
        },
        {
            address: 'n3XyjZv1HstaMeGpX1VXKMQup3mZMUekUs',
            amount: '0.00000548'
        }
    ];

     await new Promise((res) => setTimeout(res, 1000));

    const requestBody = utxoTransactionRequestBody(blockchain, recipients);

    const response = await request.post(endpointCreateUTXOTransaction(vaultId), {
        headers,
        data: requestBody,
    });

    const responseBody = await response.json();

    // ✅ Assertions
    expect(response.status()).toBe(200); // or 200 if applicable
    expect.soft(responseBody).toHaveProperty('data.item');
    expect.soft(responseBody.data.item.id).not.toBe(' ');
    expect.soft(responseBody.data.item.blockchain).toBe(blockchain);
    expect.soft(responseBody.data.item.network).toBe('testnet');
    expect.soft(responseBody.data.item.amount).toBe('0.00001641');
    expect.soft(responseBody.data.item.note).toBe('myNote');
    expect.soft(responseBody.data.item.prepareStrategy).toBe('OPTIMIZE_SIZE');

    expect.soft(responseBody.data.item.recipients[0].address).toBe('tb1qjm48rdmxn62hn534czeucgnm4lvszfxun7a00f');
    expect.soft(responseBody.data.item.recipients[0].amount).toBe('0.00000546');
    expect.soft(responseBody.data.item.recipients[1].address).toBe('tb1qvn80fllc3gdpdv78gcrnjcu0dshxnksze5juhz');
    expect.soft(responseBody.data.item.recipients[1].amount).toBe('0.00000547');
    expect.soft(responseBody.data.item.recipients[2].address).toBe('n3XyjZv1HstaMeGpX1VXKMQup3mZMUekUs');
    expect.soft(responseBody.data.item.recipients[2].amount).toBe('0.00000548');
});


test('Create Bitcoin Transaction with incorrect address recipient', async ({ request }) => {
    const recipients = [
        {
            address: 'tltc1qfua8w0nc6zlls6zzau86t7v6c7e076458yrrqs',
            amount: '0.00000546'
        }
    ];

    const requestBody = utxoTransactionRequestBody(blockchain, recipients);

    const response = await request.post(endpointCreateUTXOTransaction(vaultId), {
        headers,
        data: requestBody,
    });

    const responseBody = await response.json();
    console.log(' Response Body:', JSON.stringify(responseBody, null, 2));

    // ✅ Assertions
    expect(response.status()).toBe(409); 
    expect.soft(responseBody).toHaveProperty('error.details');
    expect.soft(responseBody.error.details[1].message).toContain('Invalid destination address');
});