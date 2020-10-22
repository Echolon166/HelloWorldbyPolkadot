# Enable NFT Support

Runtime: https://github.com/Echolon166/HelloWorldbyPolkadot/tree/main/nft_support/node/runtime
Custom pallet to issue new NFT classes/mint tokens: https://github.com/Echolon166/HelloWorldbyPolkadot/tree/main/nft_support/node/pallets/nft

- Create a NFT class using NFT Pallet:

![](nft_create_class.png)

- Mint a NFT token using NFT Pallet:

![](nft_mint_token.png)

- Transfer NFT tokens using NFT Pallet:

![](nft_transfer_token.png)

- Search NFT classes using Orml-NFT Pallet: 

![](nft_search_classes.png)

- Search NFT tokens using Orml-NFT Pallet:

![](nft_search_tokens.png)

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