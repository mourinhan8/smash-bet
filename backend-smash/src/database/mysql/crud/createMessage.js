const logger = require("@logger");
const dayjs = require("dayjs");
const { models } = require("@mysql/index");

const createMessage = async (text, senderId) => {
    try {
        const newMessage = await models.chatMessage.create({
            senderId,
            text,
            createdAt: +dayjs(),
        });
        return newMessage;
    } catch (error) {
        logger.warn("createMessage got exception:" + exception);
        return null;
    }
};

module.exports = createMessage;
