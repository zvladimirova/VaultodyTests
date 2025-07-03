import { test, expect } from '@playwright/test';
import { getToken } from '../helpers/getToken';

test('Get Vaults List', async ({ request }) => {
  const token = getToken();

  const res = await request.get('/api/wallets?type=TEST', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(res.status()).toBe(200);
});
