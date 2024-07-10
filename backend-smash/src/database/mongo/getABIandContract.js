const logger = require("../logger/logger");
const LuffyMarketABI = require("../blockchain/abi/LuffyMarket.json").abi;
const ContractAddress = "0x4ACEB05150EA33A906f726Efe0b1EdD93521ee18";
const getABIandContract = () => {
    try {
        const address = ContractAddress;
        const abi = LuffyMarketABI;
        if (address && abi) {
            return [address, abi];
        } else {
            logger.warn(`getABIandContract cannot get address & abi`);
            return [null, null];
        }
    } catch (exception) {
        logger.warn("getABIandContract got exception:" + exception);
        return [null, null];
    }
};
module.exports = getABIandContract;
