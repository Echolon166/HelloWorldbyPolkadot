
- Get latest block:
```
$ node index.js
Block 0xcb43bf4d8b6332034da853b578f5811ae4ab6a3302e0100c70afe52ffad258dd:
 {
  "block": {
    "header": {
      "parentHash": "0xdb2be20a110cda2159e981fa5d5e5ad92699399167b3aa3dd5f853b54df8e82e",
      "number": 2076290,
      "stateRoot": "0xf3b65a74570c94a1964ca6b76842a09ac85161c47d39440b3a5e83135b644c8e",
      "extrinsicsRoot": "0x0308758377e117d685ba278afc5cfb8d00508208d4fd95aaeeef2af9600e5047",
      "digest": {
        "logs": [
          {
            "PreRuntime": [
              1161969986,
              "0x03ae0000007bb0ec0f00000000b61c76f998731dfab10f0dfaf85c29a17804cf4fa58c26b7fbba040b515a390fa7f5e857d46bfc4ad4a9443f0ba15e4ef652c2f29f8068c51009e6c8d2434a0f109c09dfc81956357287184dcaa9fab6787180c7ecd5ed15397eeca89d20900b"
            ]
          },
          {
            "Seal": [
              1161969986,
              "0xacb927cdcdf778e86c14904a920ced941851a9ef75c4fd899a8da450cf99567eab6007218cd22a66146c75db468a731b83746add48a501a59c71a573f0583884"
            ]
          }
        ]
      }
    },
    "extrinsics": [
      "0x280403000bd042683b7501",
      "0x1c040a00feb97e00"
    ]
  },
  "justification": "0x"
}
```

- Get block by it's hash:
```
$ node index.js 0xa3f310bdd0dc85244488927190510aecd5a9daac991c0012dd31e8cc699b0dbf
Block 0xa3f310bdd0dc85244488927190510aecd5a9daac991c0012dd31e8cc699b0dbf:
 {
  "block": {
    "header": {
      "parentHash": "0x8de7f3680932618992b8ec246fe9b55ec3fe527a4c4205e534f03dae9a2376b7",
      "number": 2076325,
      "stateRoot": "0xccbddbd071fadb24da5b9e1076398c1f6188acb7e1d6eb2699d8fb4f78c98426",
      "extrinsicsRoot": "0xb9fef8251a526015296f6bce3800d522f311fa2e0c5ec0d41e7392896c9ea782",
      "digest": {
        "logs": [
          {
            "PreRuntime": [
              1161969986,
              "0x03800000009eb0ec0f000000007ea91e4accbbf7918edce58880d0a9d4e8fe4e170e3fce5c8112a1a5ad39fc6183dc1e2a546ba76cda92a105ae540712046559d7b4cc90961dd08a5865d92707139286f8d908cb8dd809895e2808d74468053d222309314aef94e3a708e52707"
            ]
          },
          {
            "Seal": [
              1161969986,
              "0x88c055c4ee293ddb1f0c87ad8271be111ad3f9b9cb8617e88e1b7055b6f97e5a208b173167e52a26e3b08bd299086370fea25af613e629bf235bf51e976b2486"
            ]
          }
        ]
      }
    },
    "extrinsics": [
      "0x280403000b20776b3b7501"
    ]
  },
  "justification": "0x"
}
```

- Get block by it's number(height):
```
$ node index.js 2076325
Block 0xa3f310bdd0dc85244488927190510aecd5a9daac991c0012dd31e8cc699b0dbf:
 {
  "block": {
    "header": {
      "parentHash": "0x8de7f3680932618992b8ec246fe9b55ec3fe527a4c4205e534f03dae9a2376b7",
      "number": 2076325,
      "stateRoot": "0xccbddbd071fadb24da5b9e1076398c1f6188acb7e1d6eb2699d8fb4f78c98426",
      "extrinsicsRoot": "0xb9fef8251a526015296f6bce3800d522f311fa2e0c5ec0d41e7392896c9ea782",
      "digest": {
        "logs": [
          {
            "PreRuntime": [
              1161969986,
              "0x03800000009eb0ec0f000000007ea91e4accbbf7918edce58880d0a9d4e8fe4e170e3fce5c8112a1a5ad39fc6183dc1e2a546ba76cda92a105ae540712046559d7b4cc90961dd08a5865d92707139286f8d908cb8dd809895e2808d74468053d222309314aef94e3a708e52707"
            ]
          },
          {
            "Seal": [
              1161969986,
              "0x88c055c4ee293ddb1f0c87ad8271be111ad3f9b9cb8617e88e1b7055b6f97e5a208b173167e52a26e3b08bd299086370fea25af613e629bf235bf51e976b2486"
            ]
          }
        ]
      }
    },
    "extrinsics": [
      "0x280403000b20776b3b7501"
    ]
  },
  "justification": "0x"
}
```

