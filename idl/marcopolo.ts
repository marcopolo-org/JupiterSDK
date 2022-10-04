export type Marcopolo = {
  "version": "0.1.1",
  "name": "marcopolo",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "projectOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lpFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "buybackFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "projectFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "mercantiFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "initialTokenX",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "initialTokenY",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createProvider",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenXAmount",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "tokenYAmount",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "addTokens",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "deltaX",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "deltaY",
          "type": {
            "defined": "Token"
          }
        }
      ]
    },
    {
      "name": "withdrawBuyback",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buybackXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapperXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapperYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "referrerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "deltaIn",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "priceLimit",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "xToY",
          "type": "bool"
        }
      ]
    },
    {
      "name": "withdrawShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shares",
          "type": {
            "defined": "Token"
          }
        }
      ]
    },
    {
      "name": "withdrawLpFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawProjectFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "projectOwnerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "projectOwnerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "projectOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supply",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createDualFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createTripleFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectSecond",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawRewards",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closePool",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawMercantiFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mercantiXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mercantiYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addSupply",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectSecond",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFees",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newBuybackFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newProjectFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newProviderFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newMercantiFee",
          "type": {
            "defined": "FixedPoint"
          }
        }
      ]
    },
    {
      "name": "resetFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "farm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "tokens",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "tokenAccounts",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "supply",
            "type": {
              "array": [
                {
                  "defined": "Token"
                },
                3
              ]
            }
          },
          {
            "name": "supplyLeft",
            "type": {
              "array": [
                {
                  "defined": "Token"
                },
                3
              ]
            }
          },
          {
            "name": "accumulatedSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "offsetSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "lastUpdate",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farmType",
            "type": {
              "defined": "FarmType"
            }
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenX",
            "type": "publicKey"
          },
          {
            "name": "tokenY",
            "type": "publicKey"
          },
          {
            "name": "poolXAccount",
            "type": "publicKey"
          },
          {
            "name": "poolYAccount",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "projectOwner",
            "type": "publicKey"
          },
          {
            "name": "tokenXReserve",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "tokenYReserve",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "selfShares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "allShares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "buybackAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "buybackAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "projectAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "projectAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "mercantiAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "mercantiAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "lpAccumulatorX",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lpAccumulatorY",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "constK",
            "type": {
              "defined": "Product"
            }
          },
          {
            "name": "price",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lpFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "buybackFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "projectFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "mercantiFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "farmCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "provider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenX",
            "type": "publicKey"
          },
          {
            "name": "tokenY",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "shares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "lastFeeAccumulatorX",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastFeeAccumulatorY",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastWithdrawTime",
            "type": "u64"
          },
          {
            "name": "tokensOwedX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "tokensOwedY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "currentFarmCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "programAuthority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "nonce",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FixedPoint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Token",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "FarmType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Single"
          },
          {
            "name": "Dual"
          },
          {
            "name": "Triple"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeltaTooBig",
      "msg": "Delta greater than provider's tokens"
    },
    {
      "code": 6001,
      "name": "TokenUnderflow",
      "msg": "Token amount underflow"
    },
    {
      "code": 6002,
      "name": "WrongRatio",
      "msg": "Wrong tokens ratio"
    },
    {
      "code": 6003,
      "name": "TooMuchShares",
      "msg": "Too much shares provided"
    },
    {
      "code": 6004,
      "name": "SwapToBig",
      "msg": "Swap too big"
    },
    {
      "code": 6005,
      "name": "FeeExceeded",
      "msg": "Fee exceeded 100%"
    },
    {
      "code": 6007,
      "name": "ScalesNotEqual",
      "msg": "Scales have to be equal"
    },
    {
      "code": 6008,
      "name": "FeeExceededDeltaOut",
      "msg": "Fees exceeded delta_out"
    },
    {
      "code": 6009,
      "name": "PriceLimitExceeded",
      "msg": "Price limit exceeded"
    },
    {
      "code": 6010,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6011,
      "name": "TokensAreTheSame",
      "msg": "Tokens are the same"
    },
    {
      "code": 6012,
      "name": "WrongFarm",
      "msg": "Cannot add supply to wrong farm"
    },
    {
      "code": 6013,
      "name": "RewardsExceedingSupply",
      "msg": "Cannot withdraw rewards exceeding supply left"
    },
    {
      "code": 6014,
      "name": "FarmNotEnded",
      "msg": "Farm has not ended, cannot add additional rewards"
    },
    {
      "code": 6015,
      "name": "ZeroAmount",
      "msg": "Must provide a nonzero amount"
    },
    {
      "code": 6016,
      "name": "InvariantChanged",
      "msg": "Invariant has changed"
    }
  ],
  "metadata": {
    "address": "9tKE7Mbmj4mxDjWatikzGAtkoWosiiZX9y6J4Hfm2R8H"
  }
};

export const IDL: Marcopolo = {
  "version": "0.1.1",
  "name": "marcopolo",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "projectOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lpFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "buybackFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "projectFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "mercantiFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "initialTokenX",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "initialTokenY",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createProvider",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenXAmount",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "tokenYAmount",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "addTokens",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "deltaX",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "deltaY",
          "type": {
            "defined": "Token"
          }
        }
      ]
    },
    {
      "name": "withdrawBuyback",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buybackXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapperXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapperYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "referrerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "deltaIn",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "priceLimit",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "xToY",
          "type": "bool"
        }
      ]
    },
    {
      "name": "withdrawShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shares",
          "type": {
            "defined": "Token"
          }
        }
      ]
    },
    {
      "name": "withdrawLpFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawProjectFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "projectOwnerXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "projectOwnerYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "projectOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supply",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createDualFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createTripleFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectSecond",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawRewards",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "provider",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closePool",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buybackYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawMercantiFee",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mercantiXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mercantiYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolXAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolYAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addSupply",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supplyMarco",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectFirst",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "supplyProjectSecond",
          "type": {
            "defined": "Token"
          }
        },
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFees",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newBuybackFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newProjectFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newProviderFee",
          "type": {
            "defined": "FixedPoint"
          }
        },
        {
          "name": "newMercantiFee",
          "type": {
            "defined": "FixedPoint"
          }
        }
      ]
    },
    {
      "name": "resetFarm",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "farm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarco",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminMarcoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectFirstAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminProjectSecondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "farm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "tokens",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "tokenAccounts",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "supply",
            "type": {
              "array": [
                {
                  "defined": "Token"
                },
                3
              ]
            }
          },
          {
            "name": "supplyLeft",
            "type": {
              "array": [
                {
                  "defined": "Token"
                },
                3
              ]
            }
          },
          {
            "name": "accumulatedSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "offsetSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "lastUpdate",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "farmType",
            "type": {
              "defined": "FarmType"
            }
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenX",
            "type": "publicKey"
          },
          {
            "name": "tokenY",
            "type": "publicKey"
          },
          {
            "name": "poolXAccount",
            "type": "publicKey"
          },
          {
            "name": "poolYAccount",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "projectOwner",
            "type": "publicKey"
          },
          {
            "name": "tokenXReserve",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "tokenYReserve",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "selfShares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "allShares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "buybackAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "buybackAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "projectAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "projectAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "mercantiAmountX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "mercantiAmountY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "lpAccumulatorX",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lpAccumulatorY",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "constK",
            "type": {
              "defined": "Product"
            }
          },
          {
            "name": "price",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lpFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "buybackFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "projectFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "mercantiFee",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "farmCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "provider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenX",
            "type": "publicKey"
          },
          {
            "name": "tokenY",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "shares",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "lastFeeAccumulatorX",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastFeeAccumulatorY",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastSecondsPerShare",
            "type": {
              "defined": "FixedPoint"
            }
          },
          {
            "name": "lastWithdrawTime",
            "type": "u64"
          },
          {
            "name": "tokensOwedX",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "tokensOwedY",
            "type": {
              "defined": "Token"
            }
          },
          {
            "name": "currentFarmCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "programAuthority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "nonce",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FixedPoint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Token",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "v",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "FarmType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Single"
          },
          {
            "name": "Dual"
          },
          {
            "name": "Triple"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeltaTooBig",
      "msg": "Delta greater than provider's tokens"
    },
    {
      "code": 6001,
      "name": "TokenUnderflow",
      "msg": "Token amount underflow"
    },
    {
      "code": 6002,
      "name": "WrongRatio",
      "msg": "Wrong tokens ratio"
    },
    {
      "code": 6003,
      "name": "TooMuchShares",
      "msg": "Too much shares provided"
    },
    {
      "code": 6004,
      "name": "SwapToBig",
      "msg": "Swap too big"
    },
    {
      "code": 6005,
      "name": "FeeExceeded",
      "msg": "Fee exceeded 100%"
    },
    {
      "code": 6007,
      "name": "ScalesNotEqual",
      "msg": "Scales have to be equal"
    },
    {
      "code": 6008,
      "name": "FeeExceededDeltaOut",
      "msg": "Fees exceeded delta_out"
    },
    {
      "code": 6009,
      "name": "PriceLimitExceeded",
      "msg": "Price limit exceeded"
    },
    {
      "code": 6010,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6011,
      "name": "TokensAreTheSame",
      "msg": "Tokens are the same"
    },
    {
      "code": 6012,
      "name": "WrongFarm",
      "msg": "Cannot add supply to wrong farm"
    },
    {
      "code": 6013,
      "name": "RewardsExceedingSupply",
      "msg": "Cannot withdraw rewards exceeding supply left"
    },
    {
      "code": 6014,
      "name": "FarmNotEnded",
      "msg": "Farm has not ended, cannot add additional rewards"
    },
    {
      "code": 6015,
      "name": "ZeroAmount",
      "msg": "Must provide a nonzero amount"
    },
    {
      "code": 6016,
      "name": "InvariantChanged",
      "msg": "Invariant has changed"
    }
  ],
  "metadata": {
    "address": "9tKE7Mbmj4mxDjWatikzGAtkoWosiiZX9y6J4Hfm2R8H"
  }
};