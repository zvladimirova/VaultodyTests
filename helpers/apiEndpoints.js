export const API_ENDPOINTS = {
  // auth: {
  //   login: '/auth/login',
  //   logout: '/auth/logout',
  //   refreshToken: '/auth/refresh',
  // },
  //   users: {
  //   list: '/users',
  //   getById: (id) => `/users/${id}`,
  //   delete: (id) => `/users/${id}`,
  // },
  vaults: {
    listVaults: `/api/vaults/TEST/balances`,
    listByVaultId: (id) => `/api/wallets/${id}/balances`,
    createVault: '/api/wallets',
    updateVault: (vaultId) => `/api/wallets/${vaultId}`,
  },
  addresses: {
    createAddress: (vaultId) => `/api/wallets/${vaultId}/addresses/deposit`,

  },
  transactions: {    
    createUTXOTransaction:(vaultID) => `/api/wallets/${vaultID}/tx-requests/utxo/coin`,
  },
};