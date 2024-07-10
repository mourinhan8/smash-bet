require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");
const dayjs = require("dayjs");

const updateResultProcessWithdrawRequest = async (ids, hash, result) => {
    try {
        if (result == "success" && hash != null) {
            await sequelize.transaction(async (trans) => {
                let promiseTxs = [];
                for (let index = 0; index < ids.length; index++) {
                    const withdrawId = ids[index];
                    const request = await models.withdrawRequest.findOne({
                        where: {
                            id: +withdrawId,
                        },
                    });
                    if (request) {
                        request.botExecuteStatus = result;
                        request.txHash = hash;
                        request.executedAt = +dayjs();
                        request.finishedAt = +dayjs();
                        promiseTxs.push(request.save({ transaction: trans }));
                        promiseTxs.push(
                            models.transactions.update(
                                {
                                    txHash: hash,
                                    updatedAt: +dayjs(),
                                },
                                {
                                    where: {
                                        id: +request.transactionId,
                                        userId: +request.userId,
                                    },
                                    transaction: trans,
                                }
                            )
                        );
                    }
                }
                await Promise.all(promiseTxs);
                trans.afterCommit(() => {
                    logger.info(
                        `updateResultProcessWithdrawRequest success for ids=${ids}, hash=${hash}, result=${result}...`
                    );
                });
            });
        } else {
            if (result == "executing") {
                await sequelize.transaction(async (trans) => {
                    let promiseTxs = [];
                    for (let index = 0; index < ids.length; index++) {
                        const withdrawId = ids[index];
                        const request = await models.withdrawRequest.findOne({
                            where: {
                                id: +withdrawId,
                            },
                        });
                        if (request) {
                            request.botExecuteStatus = result;
                            request.txHash = hash;
                            request.executedAt = +dayjs();
                            promiseTxs.push(request.save({ transaction: trans }));
                        }
                    }

                    await Promise.all(promiseTxs);
                    trans.afterCommit(() => {
                        logger.info(
                            `updateResultProcessWithdrawRequest success for ids=${ids}, hash=${hash}, result=${result}...`
                        );
                    });
                });
            } else if (result == "fail") {
                await sequelize.transaction(async (trans) => {
                    let promiseTxs = [];
                    for (let index = 0; index < ids.length; index++) {
                        const withdrawId = ids[index];
                        const request = await models.withdrawRequest.findOne({
                            where: {
                                id: +withdrawId,
                            },
                        });
                        if (request) {
                            request.botExecuteStatus = result;
                            request.txHash = hash;
                            request.executedAt = +dayjs();
                            promiseTxs.push(request.save({ transaction: trans }));

                            //refund the withdraw amount cause by failed transactions
                            const transactionWithdrawInfo = await models.transactions.findOne({
                                where: {
                                    id: +request.transactionId,
                                },
                            });
                            if (transactionWithdrawInfo) {
                                promiseTxs.push(
                                    models.transactions.create(
                                        {
                                            userId: +transactionWithdrawInfo.userId,
                                            walletId: +transactionWithdrawInfo.walletId,
                                            tokenId: +transactionWithdrawInfo.tokenId,
                                            type: "withdraw_refund",
                                            message: `refund the withdraw amount cause by failed exec transaction`,
                                            value: +transactionWithdrawInfo.value,
                                            fee: 0,
                                            txHash: null,
                                            preBalance: +transactionWithdrawInfo.postBalance,
                                            postBalance:
                                                +transactionWithdrawInfo.postBalance + +transactionWithdrawInfo.value,
                                            createdAt: +dayjs(),
                                        },
                                        {
                                            transaction: trans,
                                        }
                                    )
                                );

                                const walletInstance = await models.wallets.findOne({
                                    where: {
                                        id: +transactionWithdrawInfo.walletId,
                                        tokenId: +transactionWithdrawInfo.tokenId,
                                    },
                                });
                                walletInstance.balance += +transactionWithdrawInfo.value;
                                walletInstance.updatedAt = +dayjs();
                                promiseTxs.push(walletInstance.save({ transaction: trans }));
                            }
                        }
                    }

                    await Promise.all(promiseTxs);
                    trans.afterCommit(() => {
                        logger.info(
                            `updateResultProcessWithdrawRequest success for ids=${ids}, hash=${hash}, result=${result}...`
                        );
                    });
                });
            }
        }
    } catch (exception) {
        logger.warn("updateResultProcessWithdrawRequest got exception:" + exception);
        return [];
    }
};

module.exports = updateResultProcessWithdrawRequest;
