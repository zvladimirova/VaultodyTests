// helpers/getToken.ts
import fs from 'fs';
import path from 'path';

export function getToken() {
  const tokenPath = path.resolve(__dirname, '../auth-token.json');
  const raw = fs.readFileSync(tokenPath, 'utf-8');
  const { token } = JSON.parse(raw);
  return token;
}

export const commonHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});