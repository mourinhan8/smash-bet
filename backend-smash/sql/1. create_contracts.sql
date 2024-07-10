
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `contracts`;
CREATE TABLE `contracts` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`chain_id` VARCHAR ( 10 ) NOT NULL,
	`network_name` VARCHAR ( 100 ) NOT NULL,
	`contract_name` VARCHAR ( 100 ) NOT NULL,
	`contract_address` VARCHAR ( 100 ) NOT NULL,
	`contract_abi` TEXT NOT NULL,
	`explorer_url` VARCHAR ( 255 ) NOT NULL,
	`rpc_endpoint` VARCHAR ( 255 ) NULL,
	`status` enum ( 'enable', 'disable' ) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,
	UNIQUE INDEX `chain_id` ( `chain_id` ) USING BTREE,
	UNIQUE INDEX `network_name` ( `network_name` ) USING BTREE 
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `contracts` ( `chain_id`, `network_name`, `contract_name`, `contract_address`, `contract_abi`, `explorer_url`, `rpc_endpoint`, `status`, `created_at`, `updated_at` )
VALUES
	( '0x38', 'binance-smart-chain', 'SuperSmashBros', '0x9a6f1556E5Ad781345BF137A674E4df5859CB0aA','[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "uniswapRouter",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_currencyToken",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountReceived",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DepositEth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "wallets",
          "type": "address[]"
        }
      ],
      "name": "WithdrawBulkEthToWallets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "wallets",
          "type": "address[]"
        }
      ],
      "name": "WithdrawBulkTokensToWallets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawEth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_currencyToken",
          "type": "address"
        }
      ],
      "name": "changecurrencyToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "valid",
          "type": "bool"
        }
      ],
      "name": "editWhitelistAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uniswapV2Router",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelist",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]', 
	'https://bscscan.com/tx/', 'https://bsc.blockpi.network/v1/rpc/public', 'enable', 1670561509388, 1670561509388);