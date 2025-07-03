export const generateAddressCreateRequestBody = (name, blockchain) => ({
    context: 'string',
    data: {
        item: {
            blockchain,
            name
        },
    },
});