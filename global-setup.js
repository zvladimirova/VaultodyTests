// global-setup.ts
import fs from 'fs';
import path from 'path';
import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const TOKEN_PATH = path.resolve(__dirname, 'auth-token.json');

async function globalSetup() {
    const reqContext = await request.newContext();

    const response = await reqContext.post(`${process.env.API_BASE_URL}/mobile/api/devices/authenticate`, {
        data: {
            "context": "mobile",
            "data": {
                "item": {
                    authCode: process.env.AUTHCODE,
                    deviceId: process.env.DEVICEID,
                    clientId: process.env.CLIENTID,
                    userId: process.env.USERID
                }
            }
        },



    });

    const body = await response.json();

    if (!body.data.item.accessToken) {
        throw new Error('Login failed: Token not found in response');
    }

    fs.writeFileSync(TOKEN_PATH, JSON.stringify({ token: body.data.item.accessToken }));
    await reqContext.dispose();
}

export default globalSetup;