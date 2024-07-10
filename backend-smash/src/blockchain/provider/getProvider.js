require("module-alias/register");
require("dotenv").config();
const ethers = require("ethers");
const RpcUrls = require("@blockchain/constant/RpcUrls");
const ChainIds = require("@blockchain/constant/ChainIds");

const getProvider = async (chainId) => {
    let urlRpcForChainId;
    switch (chainId) {
        case ChainIds.BSC_TESTNET:
            urlRpcForChainId = RpcUrls.BSC_TESTNET;
            break;
        case ChainIds.ETH_TESTNET:
            urlRpcForChainId = RpcUrls.ETH_TESTNET;
            break;
        case ChainIds.POLYGON_TESTNET:
            urlRpcForChainId = RpcUrls.POLYGON_TESTNET;
            break;
        case ChainIds.BSC_MAINNET:
            urlRpcForChainId = RpcUrls.BSC_MAINNET;
            break;
        case ChainIds.ETH_MAINNET:
            urlRpcForChainId = RpcUrls.ETH_MAINNET;
            break;
        case ChainIds.POLYGON_MAINNET:
            urlRpcForChainId = RpcUrls.POLYGON_MAINNET;
            break;
        case ChainIds.UNICORN_ULTRA_TESTNET:
            urlRpcForChainId = RpcUrls.UNICORN_ULTRA_TESTNET;
            break;
        default:
            urlRpcForChainId = RpcUrls.UNICORN_ULTRA_TESTNET;
            break;
    }
    return new ethers.providers.JsonRpcProvider(urlRpcForChainId);
};

module.exports = getProvider;
