import Web3 from "web3";
import { ethers } from "ethers";

// import { AbiItem } from "web3-utils";

export const bytecode  = "0x60806040523480156200001157600080fd5b5060405162000d9838038062000d98833981016040819052620000349162000311565b8251839083906200004d9060039060208501906200019e565b508051620000639060049060208401906200019e565b50505060008111620000ad5760405162461bcd60e51b815260206004820152600e60248201526d696e76616c6964207375706c6c7960901b60448201526064015b60405180910390fd5b620000d233620000c06012600a62000499565b620000cc9084620004b1565b620000db565b5050506200052b565b6001600160a01b038216620001335760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401620000a4565b8060026000828254620001479190620004d3565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b828054620001ac90620004ee565b90600052602060002090601f016020900481019282620001d057600085556200021b565b82601f10620001eb57805160ff19168380011785556200021b565b828001600101855582156200021b579182015b828111156200021b578251825591602001919060010190620001fe565b50620002299291506200022d565b5090565b5b808211156200022957600081556001016200022e565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200026c57600080fd5b81516001600160401b038082111562000289576200028962000244565b604051601f8301601f19908116603f01168101908282118183101715620002b457620002b462000244565b81604052838152602092508683858801011115620002d157600080fd5b600091505b83821015620002f55785820183015181830184015290820190620002d6565b83821115620003075760008385830101525b9695505050505050565b6000806000606084860312156200032757600080fd5b83516001600160401b03808211156200033f57600080fd5b6200034d878388016200025a565b945060208601519150808211156200036457600080fd5b5062000373868287016200025a565b925050604084015190509250925092565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003db578160001904821115620003bf57620003bf62000384565b80851615620003cd57918102915b93841c93908002906200039f565b509250929050565b600082620003f45750600162000493565b81620004035750600062000493565b81600181146200041c5760028114620004275762000447565b600191505062000493565b60ff8411156200043b576200043b62000384565b50506001821b62000493565b5060208310610133831016604e8410600b84101617156200046c575081810a62000493565b6200047883836200039a565b80600019048211156200048f576200048f62000384565b0290505b92915050565b6000620004aa60ff841683620003e3565b9392505050565b6000816000190483118215151615620004ce57620004ce62000384565b500290565b60008219821115620004e957620004e962000384565b500190565b600181811c908216806200050357607f821691505b602082108114156200052557634e487b7160e01b600052602260045260246000fd5b50919050565b61085d806200053b6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a0565b6040516100c3919061069a565b60405180910390f35b6100df6100da36600461070b565b610232565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610735565b61024a565b604051601281526020016100c3565b6100df61013136600461070b565b61026e565b6100f3610144366004610771565b6001600160a01b031660009081526020819052604090205490565b6100b6610290565b6100df61017536600461070b565b61029f565b6100df61018836600461070b565b61031f565b6100f361019b366004610793565b61032d565b6060600380546101af906107c6565b80601f01602080910402602001604051908101604052809291908181526020018280546101db906107c6565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b600033610240818585610358565b5060019392505050565b60003361025885828561047c565b6102638585856104f6565b506001949350505050565b600033610240818585610281838361032d565b61028b9190610801565b610358565b6060600480546101af906107c6565b600033816102ad828661032d565b9050838110156103125760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102638286868403610358565b6000336102408185856104f6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103ba5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610309565b6001600160a01b03821661041b5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610309565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610488848461032d565b905060001981146104f057818110156104e35760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610309565b6104f08484848403610358565b50505050565b6001600160a01b03831661055a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610309565b6001600160a01b0382166105bc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610309565b6001600160a01b038316600090815260208190526040902054818110156106345760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610309565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36104f0565b600060208083528351808285015260005b818110156106c7578581018301518582016040015282016106ab565b818111156106d9576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461070657600080fd5b919050565b6000806040838503121561071e57600080fd5b610727836106ef565b946020939093013593505050565b60008060006060848603121561074a57600080fd5b610753846106ef565b9250610761602085016106ef565b9150604084013590509250925092565b60006020828403121561078357600080fd5b61078c826106ef565b9392505050565b600080604083850312156107a657600080fd5b6107af836106ef565b91506107bd602084016106ef565b90509250929050565b600181811c908216806107da57607f821691505b602082108114156107fb57634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561082257634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220e7d03040db0b699bb0f0e5d58208d53ec15564d72d19c1eb24e696c3373b63a964736f6c63430008080033" ;


export const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_supply",
        "type": "uint256"
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
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as any[];

export class ContractToken { 
  address = "";
  contract = null as any;
  web3 = null as Web3;

  constructor(address: string) {
    this.address = address;
    const web3 = new Web3(Web3.givenProvider);
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abi, address);
  }

  async getSymbol(): Promise<string> {
    let response = await this.contract.methods.symbol().call();
    return response;
  }

  async getName(): Promise<string> {
    let response = await this.contract.methods.name().call();
    return response;
  }

  async getDecimals(): Promise<string> {
    let response = await this.contract.methods.decimals().call();
    return response;
  }

  async getBalanceByWallet(userAddress: string) {
    let response = await this.contract.methods.balanceOf(userAddress).call();
    return response;
  }

  async allowance(owner: string, spender: string) {
    let response = await this.contract.methods.allowance(owner, spender).call();
    return response;
  }

  async getTotalSupply() {
    let response = await this.contract.methods.totalSupply().call();
    return response;
  }

  async approve(spender: string, amount: string, sender: string) {
    let response = await this.contract.methods.approve(spender, amount).send({ from: sender });
    return response;
  }
}

export class ContractTokenEthers {
  address = "";
  contract = null as any;

  constructor(address: string, rpcUrl: string) {
    this.address = address;
    this.contract = new ethers.Contract(address, abi, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async getName(): Promise<string> {
    let response = await this.contract.methods.name().call();
    return response;
  }

  async getSymbol(): Promise<string> {
    let response = await this.contract.symbol();
    return response;
  }

  async getDecimals(): Promise<string> {
    let response = await this.contract.decimals();
    return response.toString();
  }

  async getBalanceByWallet(userAddress: string) {
    let response = await this.contract.balanceOf(userAddress);
    return response.toString();
  }

  async allowance(owner: string, spender: string) {
    let response = await this.contract.allowance(owner, spender);
    return response;
  }

  async getTotalSupply() {
    let response = await this.contract.totalSupply();
    return response;
  }

  async approve(spender: string, amount: string, sender: string) {
    let response = await this.contract.approve(spender, amount).send({ from: sender });
    return response;
  }
}
