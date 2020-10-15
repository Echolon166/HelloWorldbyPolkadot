const { ApiPromise, WsProvider} = require('@polkadot/api');

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

/*
    Returns information about the specified(latest if not specified) block on Polkadot.
        Accepts both block hash and block number(height) as parameter.
*/
async function main() {
    const params = process.argv.slice(2);
    if(params.length > 1){
        throw Error("Too many arguments.");
    }

    const api = await ApiPromise.create({ provider: wsProvider });

    let hash;
    if (params.length == 0) {
        hash = await api.rpc.chain.getFinalizedHead();
    }
    else /*if (params.length == 1)*/ {
        hash = params[0].includes("0x") ? params[0] : await api.rpc.chain.getBlockHash(params[0]);
    }

    const block = await api.rpc.chain.getBlock(hash);
    console.log(`Block ${hash}:\n`, JSON.stringify(block, null, 2));
}

main()
    .catch(console.error)
    .finally(() => process.exit());