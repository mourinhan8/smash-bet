require("module-alias/register");
const logger = require("@logger");
const config = require("@config");
const eventSwapHistory = require("@blockchain/listener/eventSwapHistory");

crawlEventHistoryBSC = async () => {
    try {
        await eventSwapHistory(config.blockchain.chainId.bsc);
    } catch (error) {
        logger.warn("crawlEventHistoryBSC got exception:", error);
    }
};

module.exports = crawlEventHistoryBSC;
