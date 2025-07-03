export const utxoTransactionRequestBody = (
    blockchain,
    recipients,
    note = "myNote",
    prepareStrategy = "optimize_size",
    feePriority = "slow"
) => ({
    data: {
        item: {
            blockchain,
            note,
            prepareStrategy,
            recipients,
            feePriority
        }
    }
});


export const acountTransactonRequestBody = (name, blockchain) => ({    //Ethereum, Polygon, BSC, Avalanche, Fantom, Arbitrum, Optimism
    context: 'string',
    data: {
        item: {
            blockchain,
            name
        },
    },
});

export const staicFeeTransactonRequestBody = (name, blockchain) => ({   //Tron and Solana
    context: 'string',
    data: {
        item: {
            blockchain,
            name
        },
    },
});