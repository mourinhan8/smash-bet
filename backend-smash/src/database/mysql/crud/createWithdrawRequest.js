require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");
const dayjs = require("dayjs");

const createWithdrawRequest = async (userId, amount) => {
    try {
        const userWallet = await models.wallets.findOne({
            where: {
                userId: userId,
                tokenId: 1,
            },
        });

        if (!userWallet || +userWallet.balance < +amount) {
            logger.warn("createWithdrawRequest got exception: the amount is greater than user balance");
            return "the amount must be lower than user's balance";
        } else {
            await sequelize.transaction(async (trans) => {
                const preUserBalance = +userWallet.balance;
                userWallet.balance = preUserBalance - amount;
                userWallet.updatedAt = +dayjs();
                const [saveWallet, saveTransaction] = await Promise.all([
                    await userWallet.save({ transaction: trans }),
                    await models.transactions.create(
                        {
                            userId: userId,
                            walletId: +userWallet.id,
                            tokenId: 1, //only BUSD
                            type: "withdraw",
                            message: `withdraw request from user`,
                            value: +amount,
                            fee: 0,
                            txHash: null,
                            preBalance: preUserBalance,
                            postBalance: preUserBalance - amount,
                            createdAt: +dayjs(),
                        },
                        {
                            transaction: trans,
                        }
                    ),
                ]);
                await models.withdrawRequest.create(
                    {
                        userId: +userId,
                        tokenId: 1,
                        transactionId: +saveTransaction.id,
                        amount: +amount,
                        fee: 0,
                        adminCheck: "pending",
                        createdAt: +dayjs(),
                    },
                    {
                        transaction: trans,
                    }
                );

                trans.afterCommit(() => {
                    logger.info(`createWithdrawRequest success for userId=${userId}, amount=${amount}...`);
                });
            });

            return "success";
        }
    } catch (exception) {
        logger.warn("createWithdrawRequest got exception:" + exception);
        return exception;
    }
};

module.exports = createWithdrawRequest;
