require("module-alias/register");
const logger = require("@logger");
const config = require("@config");
const eventSwapHistory = require("@blockchain/listener/eventSwapHistory");

crawlEventHistoryETH = async () => {
    try {
        await eventSwapHistory(config.blockchain.chainId.ethereum);
    } catch (error) {
        logger.warn("crawlEventHistoryETH got exception:", error);
    }
};

module.exports = crawlEventHistoryETH;
