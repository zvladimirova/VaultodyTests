// Load playwright module
const { test, expect } = require('@playwright/test');

const createVaultRequestBody = require('../test-data/post_request_body.json');
const creteVaultRequestDynamicBody = require('../test-data/post_dynamic_request_body.json');


import { faker } from '@faker-js/faker';

const { DateTime } = require('luxon');



// Write a test
test('Post api requet using static request body', async ({ request }) => {

    // Create Post Request
    const postAPIResponse = await request.post('/api/wallets', {
        data: {
            "context": "string",
            "data": {
                "item": {
                    "rules": [],
                    "name": "VS Code Vault",
                    "type": "TEST",
                    "color": "#0000FF",
                    "vaultType": "GENERAL"

                }
            }
        }
    })
    //Vaildate status code
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    //Validate JSON API response
    expect(postAPIResponseBody).toHaveProperty('context');
    expect(postAPIResponseBody).toHaveProperty('data');
    expect(postAPIResponseBody.data).toHaveProperty('item');
    expect(postAPIResponseBody.data.item).toHaveProperty('id');

})


test('Post api requet using static JSON file', async ({ request }) => {

    // Create Post Request
    const postAPIResponse = await request.post('/api/wallets', {
        data: createVaultRequestBody
    })

    //Vaildate status code
    expect(postAPIResponse.status()).toBe(200);

})


test('Post api requet using dynamic request body', async ({ request }) => {

    const context = faker.string.alphanumeric(10);
    const name = faker.person.firstName();
    const color = faker.color.rgb();
    const vaultType = faker.helpers.arrayElement(['GENERAL', 'SMART', 'AUTOMATION']);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    // Create Post Request
    const postAPIResponse = await request.post('/api/wallets', {
        data: {
            "context": context,
            "data": {
                "item": {
                    "rules": [],
                    "name": name,
                    "type": "TEST",
                    "color": color,
                    "vaultType": vaultType

                }
            }
        }
    })

    expect(postAPIResponse.status()).toBe(200);

})


test('Post api requet using dynamic JSON file', async ({ request }) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(creteVaultRequestDynamicBody),
        faker.string.alphanumeric(10),
    );

    // Create Post Request
    const postAPIResponse = await request.post('/api/wallets', {
        data: JSON.parse(dynamicRequestBody)
    })
    //Vaildate status code
    expect(postAPIResponse.status()).toBe(200);


})
