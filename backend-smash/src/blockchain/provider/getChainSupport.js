require("module-alias/register");
const ChainIds = require("@blockchain/constant/ChainIds");
const config = require("@config");

const getChainSupport = {
    getBlockOffsetOfChain: (chainId) => {
        let offset = 0;
        switch (chainId) {
            case ChainIds.BSC_TESTNET:
                offset = config.blockchain.scanOffset.bsc.testnet;
                break;
            case ChainIds.ETH_TESTNET:
                offset = config.blockchain.scanOffset.ethereum.testnet;
                break;
            case ChainIds.POLYGON_TESTNET:
                offset = config.blockchain.scanOffset.polygon.testnet;
                break;
            case ChainIds.BSC_MAINNET:
                offset = config.blockchain.scanOffset.bsc.mainnet;
                break;
            case ChainIds.ETH_MAINNET:
                offset = config.blockchain.scanOffset.ethereum.mainnet;
                break;
            case ChainIds.POLYGON_MAINNET:
                offset = config.blockchain.scanOffset.polygon.mainnet;
                break;
            case ChainIds.UNICORN_ULTRA_TESTNET:
                offset = config.blockchain.scanOffset.unicorn.testnet;
                break;
            default:
                offset = config.blockchain.scanOffset.bsc.mainnet;
                break;
        }
        return offset;
    },
};

module.exports = getChainSupport;
