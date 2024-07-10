require("module-alias/register");
const ethers = require("ethers");
const Events = require("@blockchain/constant/SMCEvents");
const logger = require("@logger");

const decodeEvents = async (item, source, chainId, provider) => {
    try {
        let eventDecode;
        switch (item.event) {
            case Events.Deposit:
                const stableDecimals = 6;
                eventDecode = {
                    source: source,
                    event: item.event,
                    chainId: chainId,
                    tokenAddress: item.args[0].toLowerCase(),
                    amountETH: +ethers.utils.formatUnits(item.args[1], 18),
                    amountTokenConverted: +ethers.utils.formatUnits(item.args[2], stableDecimals),
                    userWallet: item.args[3].toLowerCase(),
                    txHash: item.transactionHash,
                    blockNumber: item.blockNumber,
                };
                logger.info(JSON.stringify(eventDecode, null, 4));
                break;
            default:
                logger.info("=====OTHERS EVENTS=====");
                logger.info(JSON.stringify(item, null, 4));
        }

        return eventDecode;
    } catch (exception) {
        logger.warn("decodeEvents got exception:" + exception);
    }
};
module.exports = decodeEvents;
