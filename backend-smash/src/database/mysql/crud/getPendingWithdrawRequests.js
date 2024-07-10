require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getPendingWithdrawRequests = async (userId) => {
    try {
        const pendingRequest = await models.withdrawRequest.findAll({
            where: {
                adminCheck: "approved",
                botExecuteStatus: "pending",
            },
            order: [["id", "ASC"]],
        });
        return pendingRequest;
    } catch (exception) {
        logger.warn("getPendingWithdrawRequests got exception:" + exception);
        return null;
    }
};

module.exports = getPendingWithdrawRequests;
