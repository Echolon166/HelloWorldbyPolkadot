# Enable Multi-Currency Support

Runtime: https://github.com/Echolon166/HelloWorldbyPolkadot/tree/main/multi_currency_support/node/runtime

- Issued custom token: ECH

- Total Issuance: 

![](tokens_total_issuance.png)

- Transfer: 

![](tokens_transfer.png)

- Account Balance: 

![](tokens_account_balance.png)

## Build & Run

If you need to,
[set up your Substrate development environment](https://substrate.dev/docs/en/knowledgebase/getting-started/#manual-installation).
Then, build and run a development chain:

```shell
$ cargo run -- --dev --tmp
```

Once the node is running, use this link to open the Polkadot JS Apps UI and connect to the Substrate
node: https://polkadot.js.org/apps/#/settings/developer?rpc=ws://127.0.0.1:9944. Use the Settings >
Developer app and the contents of the [`types.json`](node/types.json) file to add the
necessary types to the UI.