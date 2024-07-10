require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");
const dayjs = require("dayjs");

const resolveWithdrawRequest = async (requestId, result) => {
    try {
        const request = await models.withdrawRequest.findOne({
            where: {
                id: +requestId,
                adminCheck: "pending",
            },
        });
        if (request) {
            request.adminCheck = result;
            if (result == "rejected") {
                const userWallet = await models.wallets.findOne({
                    where: {
                        userId: +request.userId,
                        tokenId: 1,
                    },
                });
                if (userWallet) {
                    const currentBalance = +userWallet.balance;
                    await sequelize.transaction(async (trans) => {
                        userWallet.balance = currentBalance + +request.amount;
                        userWallet.updatedAt = +dayjs();
                        await Promise.all([
                            models.transactions.create(
                                {
                                    userId: +request.userId,
                                    walletId: +userWallet.id,
                                    tokenId: 1, //only BUSD
                                    type: "redeem",
                                    message: `redeem balance for userId=${+request.userId} with withdrawId=${requestId} cause by admin rejected`,
                                    value: +request.amount,
                                    fee: 0,
                                    txHash: null,
                                    preBalance: currentBalance,
                                    postBalance: currentBalance + +request.amount,
                                    createdAt: +dayjs(),
                                },
                                {
                                    transaction: trans,
                                }
                            ),
                            userWallet.save({ transaction: trans }),
                        ]);
                        trans.afterCommit(() => {
                            logger.info(
                                `resolveWithdrawRequest redeem balance successful for requestId=${requestId} cause by admin rejected.`
                            );
                        });
                    });
                }
            } else if (result == "approved") {
                request.botExecuteStatus = "pending";
            }
            request.resolvedAt = +dayjs();
            const saveInfo = await request.save();
            return saveInfo;
        } else {
            return null;
        }
    } catch (exception) {
        logger.warn("resolveWithdrawRequest got exception:" + exception);
        return null;
    }
};

module.exports = resolveWithdrawRequest;
