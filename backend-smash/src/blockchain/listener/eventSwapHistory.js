require("module-alias/register");
const investigateSwapEvents = require("@blockchain/investigate/investigateSwapEvents");
const SMCEvents = require("@blockchain/constant/SMCEvents");
const logger = require("@logger");
const getAbiContract = require("@mysql/crud/getAbiContract");

eventSwapHistory = async (chainId) => {
    try {
        const contractName = `SuperSmashBros`;
        const { contractAddress, contractAbi } = await getAbiContract(chainId, contractName);
        logger.info(`eventSwapHistory is running with contract=${contractAddress}...`);
        if (contractAddress !== null && contractAbi !== null) {
            for (let eventName in SMCEvents) {
                await investigateSwapEvents(contractAddress, contractAbi, eventName, chainId);
            }
        } else {
            logger.info("eventSwapHistory failed when getting contract and contractAbi...");
        }
    } catch (error) {
        logger.warn("eventSwapHistory got exception:", error);
    }
};
module.exports = eventSwapHistory;
