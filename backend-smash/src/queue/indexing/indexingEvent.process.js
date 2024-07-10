require("module-alias/register");
const SuperSmashOnchainService = require("@service/superSmashOnchain.service");
const SMCEvents = require("@blockchain/constant/SMCEvents");
const logger = require("@logger");

const indexingEventProcess = async (data) => {
    try {
        if (data.eventDetail !== undefined) {
            logger.info("event is comming to queue => processing now...");
            const item = data.eventDetail;
            const eventName = item.event;
            const Events = { ...SMCEvents };
            switch (eventName) {
                case Events.Deposit:
                    await SuperSmashOnchainService(item);
                    break;

                default:
                    logger.info("=====OTHERS EVENTS=====");
                    logger.info(JSON.stringify(item, null, 4));
            }
        } else {
            logger.warn("indexingEvent.process got undefined data! Something wrong happened!");
        }
    } catch (error) {
        logger.warn("indexingEvent.process exception: " + error);
    }
};

module.exports = indexingEventProcess;
