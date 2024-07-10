require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getUserTransactionsByType = async (userId, type, limit, currentPage) => {
    try {
        const page = +(currentPage || 1);
        const pageSize = +(limit || 10);
        let transactions;
        if (type != "withdraw") {
            transactions = await models.transactions.findAndCountAll({
                where: {
                    userId,
                    type: type,
                },
                attributes: ["id", "userId", "value", "txHash", "createdAt"],
                // include: [
                //     {
                //         as: "user",
                //         model: models.users,
                //         attributes: ["id", "walletAddress"],
                //     },
                //     {
                //         as: "wallet",
                //         model: models.wallets,
                //         attributes: ["id", "tokenId"],
                //     },
                // ],
            });
        } else {
            transactions = await models.withdrawRequest.findAndCountAll({
                where: {
                    userId: +userId,
                },
                attributes: [
                    ["transaction_id", "id"],
                    "userId",
                    ["amount", "value"],
                    ["admin_check", "status"],
                    "txHash",
                    "createdAt",
                ],
            });
        }

        return {
            transactions: transactions.rows,
            total: +transactions.count,
            totalPages: Math.ceil(+transactions.count / pageSize),
            currentPage: page,
        };
    } catch (exception) {
        logger.warn("getUserWithdraw got exception:" + exception);
        return [];
    }
};

module.exports = getUserTransactionsByType;
