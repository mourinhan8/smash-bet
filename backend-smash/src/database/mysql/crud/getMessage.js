require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getMessage = async (limit, currentPage) => {
    try {
        const page = +(currentPage || 1);
        const pageSize = +(limit || 50);

        const chatHistory = await models.chatMessage.findAndCountAll({
            where: {},
            attributes: ["senderId", "text", "createdAt"],
            include: [
                {
                    as: "sender",
                    model: models.users,
                    attributes: ["walletAddress"],
                },
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["id", "DESC"]],
        });
        const messages = chatHistory.rows.map((message) => ({
            walletAddress: message.sender.walletAddress,
            text: message.text,
            createdAt: message.createdAt,
        }));
        return {
            messages: messages,
            total: +chatHistory.count,
            totalPages: Math.ceil(+chatHistory.count / pageSize),
            currentPage: page,
        };
    } catch (exception) {
        logger.warn("getMessage got exception:" + exception);
        return [];
    }
};

module.exports = getMessage;
