require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getTransactionByHash = async (txHash) => {
    try {
        const transaction = await models.transactions.findOne({
            where: {
                txHash: txHash,
            },
            order: [["id", "DESC"]],
        });

        return transaction;
    } catch (exception) {
        logger.warn("getTransactionByHash got exception:" + exception);
        return null;
    }
};

module.exports = getTransactionByHash;
