const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');
const { encodeMultiAddress } = require('@polkadot/util-crypto');
const inquirer = require("inquirer");
const UNIT = BigInt(1000000000000);

const wsProvider = new WsProvider('ws://localhost:9944');

async function txSignAndSend(account, tx) {
    return new Promise((resolve, reject) => {
        tx.signAndSend(account, (result) => {
            console.log("Transaction Status: " + result.status.type);

            if (result.status.isFinalized) {
                resolve(result);
            }
            else if (
                result.status.isDropped ||
                result.status.isInvalid ||
                result.status.isUsurped
            ) {
                console.error('ERROR: Transaction could not be finalized.');
                reject(result);
            }
        });
    });
}

async function queryBalance(api, address) {
    return (await api.query.system.account(address)).data;
}

async function queryMultisig(api, address, txHash) {
    return await api.query.multisig.multisigs(address, txHash);
}

async function main() {
    const api = await ApiPromise.create({
        provider: wsProvider,
        types: {
            Address: 'AccountId',
            LookupSource: 'AccountId'
        },
    });

    //  Get accounts

    const keyring = new Keyring({ type: "sr25519" });
    const accounts = {
        alice: keyring.addFromUri("//Alice"),
        bob: keyring.addFromUri("//Bob"),
        charlie: keyring.addFromUri("//Charlie"),
        dave: keyring.addFromUri("//Dave"),
        eve: keyring.addFromUri("//Eve"),
        ferdie: keyring.addFromUri("//Ferdie"),
    };

    console.log();

    //  Inquire details

    const transferor = (
        await inquirer.prompt([
            {
                name: "transferor",
                type: "list",
                message: "Transferor: ",
                choices: Object.keys(accounts)
                    .map((key => {
                        return `${key}`;
                    })),
            },
        ])
    ).transferor;
    const transferorAddress = accounts[transferor].address;

    const signatories = (
        await inquirer.prompt([
            {
                name: "signatories",
                type: "checkbox",
                message: "Signatories: ",
                choices: Object.keys(accounts)
                    .filter((key) => transferor !== key)
                    .map((key) => {
                        return `${key}`;
                    }),
            },
        ])
    ).signatories;
    const signatoryAddresses = signatories.map((signatory) => accounts[signatory].address);

    const transferee = (
        await inquirer.prompt([
            {
                name: "transferee",
                type: "list",
                message: "Transferee: ",
                choices: Object.keys(accounts)
                    .filter((key) => transferor !== key && !signatories.includes(key))
                    .map((key => {
                        return `${key}`;
                    })),
            },
        ])
    ).transferee;
    const transfereeAddress = accounts[transferee].address;

    const threshold = (
        await inquirer.prompt([
            {
                name: "threshold",
                type: "number",
                message: "Threshold: ",
            },
        ])
    ).threshold;

    const amount = (
        await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: `Transfer amount: `,
            },
        ])
    ).amount;

    console.log("\n- Transferee " + transferee + " address balance before transaction: " + (await queryBalance(api, transfereeAddress)).free);

    //  Encode multisig address

    console.log("\n- Encoding multisig address using transferor & other signatory addresses.");

    const multisigAddress = encodeMultiAddress(signatoryAddresses.concat(transferorAddress), threshold, 42);

    console.log("Multisig Address: " + multisigAddress);

    //  Initialise the multisig address by sending the funds

    console.log("\n- Initialising the multisig address by sending the funds from transferor.");
    console.log("Multisig address balance before transfer: " + (await queryBalance(api, multisigAddress)).free);

    const txInit = api.tx.balances.transfer(multisigAddress, BigInt(amount) * UNIT);
    await txSignAndSend(accounts[transferor], txInit);

    console.log("Multisig address balance after transfer: " + (await queryBalance(api, multisigAddress)).free);

    //  Get multisig transfer address:

    console.log("\n- Get multisig transfer tx.");

    const tx = api.tx.balances.transfer(transfereeAddress, BigInt(amount) * UNIT);
    const txHash = tx.method.hash;
    const txData = tx.method.toHex();

    console.log("Tx Hash: " + txHash);
    console.log("Tx Data: " + txData);

    //  Transferor - Approve the transaction

    console.log("\n- Transferor(Main Signatory) " + transferor + " approves the transaction.");

    const txTransferor = api.tx.multisig.approveAsMulti(threshold, signatoryAddresses, null, txHash, UNIT);
    await txSignAndSend(accounts[transferor], txTransferor);

    const multisig = await queryMultisig(api, multisigAddress, txHash);
    const timepoint = multisig.unwrap().when;

    //  Signatories - Approve the transaction

    for(let i = 0; i < signatories.length; i++) {
        console.log("\n- Signatory " + signatories[i] + " approves the transaction.");
        
        const filteredSignatoryAddresses = signatoryAddresses.slice(0, i)
            .concat(signatoryAddresses.slice(i+1, signatoryAddresses.length))
            .concat(transferorAddress);
        const txSignatory = api.tx.multisig.asMulti(threshold, filteredSignatoryAddresses, timepoint, txData, false, UNIT);
        await txSignAndSend(accounts[signatories[i]], txSignatory);
    }

    console.log("\n- Transferee " + transferee + " address balance after transaction: " + (await queryBalance(api, transfereeAddress)).free);
}

main()
    .catch(console.error)
    .finally(() => process.exit());