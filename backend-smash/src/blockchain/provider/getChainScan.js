const ChainIds = require("../constant/ChainIds");
const ChainIdsScan = require("../constant/ChainIdsScan");

const getChainScan = (chainId) => {
    let scanUrl = "";
    switch (chainId) {
        case ChainIds.BSC_TESTNET:
            scanUrl = ChainIdsScan.BSC_TESTNET;
            break;
        case ChainIds.ETH_RINKEBY:
            scanUrl = ChainIdsScan.ETH_RINKEBY;
            break;
        case ChainIds.POLYGON_TESTNET:
            scanUrl = ChainIdsScan.POLYGON_TESTNET;
            break;
        case ChainIds.BSC_MAINNET:
            scanUrl = ChainIdsScan.BSC_MAINNET;
            break;
        case ChainIds.ETH_MAINNET:
            scanUrl = ChainIdsScan.ETH_MAINNET;
            break;
        case ChainIds.POLYGON_MAINNET:
            scanUrl = ChainIdsScan.POLYGON_MAINNET;
            break;
        default:
            scanUrl = ChainIdsScan.BSC_MAINNET;
            break;
    }
    return scanUrl;
};

module.exports = getChainScan;
