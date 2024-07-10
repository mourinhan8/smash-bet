const logger = require("@logger");
const createMessage = require("@mysql/crud/createMessage");

const messageSavingProcess = async (data) => {
    try {
        logger.info("event saving message is coming to queue => processing now...");
        logger.info(JSON.stringify(data, null, 4));
        const { text, sender } = data;
        const newMessage = await createMessage(text, sender);
        if (newMessage === null) {
            logger.warn(`message ${text} from user ${sender} not saved`);
            return;
        }
        return;
    } catch (error) {
        logger(`messageSaving.process got exception ${error}`);
    }
};

module.exports = messageSavingProcess;
