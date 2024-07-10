require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getWithdrawRequest = async (limit, currentPage, userWallet, status) => {
    try {
        const page = +(currentPage || 1);
        const pageSize = +(limit || 10);
        let userRequests,
            whereStatus = {},
            whereWallet = {};

        if (status.length > 1) {
            whereStatus = {
                adminCheck: status,
            };
        }

        if (userWallet.length > 10) {
            whereWallet = {
                walletAddress: userWallet,
            };
        }

        userRequests = await models.withdrawRequest.findAndCountAll({
            where: whereStatus,
            attributes: [
                "id",
                "userId",
                "tokenId",
                "amount",
                "fee",
                "adminCheck",
                "botExecuteStatus",
                "botComment",
                "txHash",
                "createdAt",
                "resolvedAt",
                "executedAt",
            ],
            include: [
                {
                    as: "user",
                    model: models.users,
                    attributes: ["walletAddress"],
                    where: whereWallet,
                },
                {
                    as: "token",
                    model: models.tokens,
                    attributes: ["symbol"],
                },
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["id", "DESC"]],
        });
        let finalRequests = [];
        for (let index = 0; index < userRequests.rows.length; index++) {
            const item = userRequests.rows[index];
            finalRequests.push({
                id: item.id,
                userId: item.userId,
                userWallet: item.user.walletAddress,
                tokenSymbol: item.token.symbol,
                amount: item.amount,
                fee: item.fee,
                status: item.adminCheck,
                botExecuteStatus: item.botExecuteStatus,
                botComment: item.botComment,
                txHash: item.txHash,
                createdAt: item.createdAt,
                resolvedAt: item.resolvedAt,
                executedAt: item.executedAt,
            });
        }

        return {
            requests: finalRequests,
            total: +userRequests.count,
            totalPages: Math.ceil(+userRequests.count / pageSize),
            currentPage: page,
        };
    } catch (exception) {
        logger.warn("getWithdrawRequest got exception:" + exception);
        return [];
    }
};

module.exports = getWithdrawRequest;
