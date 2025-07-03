export const generateVaultCreateRequestBody = (name) => ({
    context: 'string',
    data: {
        item: {
            rules: [],
            name, // <-- inject the dynamic name
            type: 'TEST',
            color: '#0000FF',
            vaultType: 'GENERAL',
        },
    },
});

export const updateVaultRequestBody = (name) => ({
    context: "string",
    data: {
        item: {
            name, // <-- inject the dynamic name
            type: 'TEST',
            color: '#0000FF',
            vaultType: 'GENERAL'
        }
    }

});