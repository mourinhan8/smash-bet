require("module-alias/register");
const logger = require("@logger");
const { models, sequelize, Op } = require("@mysql/index");
const dayjs = require("dayjs");
const config = require("@config");

const updateGameResult = async (gameId, winnerId) => {
    try {
        const thisGame = await models.games.findOne({
            where: {
                [Op.and]: [
                    {
                        status: "starting",
                    },
                    {
                        id: +gameId,
                    },
                    {
                        finishedAt: {
                            [Op.lte]: +dayjs(),
                        },
                    },
                    {
                        [Op.or]: [
                            { firstCharacterId: winnerId },
                            { secondCharacterId: winnerId },
                            { thirdCharacterId: winnerId },
                            { fourthCharacterId: winnerId },
                        ],
                    },
                ],
            },
        });
        if (thisGame) {
            const promisesAfterGameResult = [];
            await sequelize.transaction(async (trans) => {
                thisGame.winnerId = winnerId;
                thisGame.status = "ending";
                thisGame.finishedAt = +dayjs();
                promisesAfterGameResult.push(thisGame.save({ transaction: trans }));
                if (thisGame.type === "against_system") {
                    const winners = await models.betHistory.findAll({
                        where: {
                            gameId: +gameId,
                            characterId: +winnerId,
                        },
                        attributes: ["userId", "walletId", [sequelize.fn("sum", sequelize.col("amount")), "amount"]],
                        group: ["userId", "walletId"],
                        include: [
                            {
                                as: "wallet",
                                model: models.wallets,
                                attributes: ["balance"],
                            },
                        ],
                    });
                    //calculate winAmount by Rate
                    let rateWin = 1;
                    switch (winnerId) {
                        case +thisGame.firstCharacterId:
                            rateWin = +thisGame.rateFirst;
                            break;
                        case +thisGame.secondCharacterId:
                            rateWin = +thisGame.rateSecond;
                            break;
                        case +thisGame.thirdCharacterId:
                            rateWin = +thisGame.rateThird;
                            break;
                        case +thisGame.fourthCharacterId:
                            rateWin = +thisGame.rateFourth;
                            break;
                        default:
                            break;
                    }
                    for (let index = 0; index < winners.length; index++) {
                        const currentWinner = winners[index];
                        const currentBalance = +currentWinner.wallet.balance;
                        const winAmount = +currentWinner.amount * rateWin;
                        promisesAfterGameResult.push(
                            models.transactions.create(
                                {
                                    userId: +currentWinner.userId,
                                    walletId: +currentWinner.walletId,
                                    tokenId: 1, //only BUSD
                                    type: "reward",
                                    message: `reward for winner for gameId=${gameId}, characterId=${winnerId}`,
                                    value: winAmount,
                                    fee: 0,
                                    txHash: null,
                                    preBalance: currentBalance,
                                    postBalance: currentBalance + winAmount,
                                    createdAt: +dayjs(),
                                },
                                {
                                    transaction: trans,
                                }
                            )
                        );
                        promisesAfterGameResult.push(
                            models.wallets.update(
                                {
                                    balance: currentBalance + winAmount,
                                    updatedAt: +dayjs(),
                                },
                                {
                                    where: {
                                        id: +currentWinner.walletId,
                                    },
                                    transaction: trans,
                                }
                            )
                        );
                    }
                } else {
                    if (thisGame.type === "against_others") {
                        const [totalBetAmount, winners] = await Promise.all([
                            models.betHistory.findAll({
                                where: {
                                    gameId: +gameId,
                                },
                                attributes: [[sequelize.fn("sum", sequelize.col("amount")), "amount"]],
                            }),
                            models.betHistory.findAll({
                                where: {
                                    gameId: +gameId,
                                    characterId: +winnerId,
                                },
                                attributes: [
                                    "userId",
                                    "walletId",
                                    [sequelize.fn("sum", sequelize.col("amount")), "amount"],
                                ],
                                group: ["userId", "walletId"],
                                include: [
                                    {
                                        as: "wallet",
                                        model: models.wallets,
                                        attributes: ["balance"],
                                    },
                                ],
                            }),
                        ]);
                        logger.info(JSON.stringify(totalBetAmount, null, 4));
                        logger.info(JSON.stringify(winners, null, 4));
                        if (!winners.length || winners.length == 0) {
                            //no one win
                            //refund the bet
                            const allBets = await models.betHistory.findAll({
                                where: {
                                    gameId: +gameId,
                                },
                                attributes: [
                                    "userId",
                                    "walletId",
                                    [sequelize.fn("sum", sequelize.col("amount")), "amount"],
                                ],
                                group: ["userId", "walletId"],
                                include: [
                                    {
                                        as: "wallet",
                                        model: models.wallets,
                                        attributes: ["balance"],
                                    },
                                ],
                            });
                            const refundRate = (100 - config.game.systemComBetTypeAgainstOthers) / 100;
                            logger.info(`refundRate=${refundRate}`);
                            for (let index = 0; index < allBets.length; index++) {
                                const currentBet = allBets[index];
                                const currentBalance = +currentBet.wallet.balance;
                                const refundAmount = +currentBet.amount * refundRate || 0;
                                promisesAfterGameResult.push(
                                    models.transactions.create(
                                        {
                                            userId: +currentBet.userId,
                                            walletId: +currentBet.walletId,
                                            tokenId: 1, //only BUSD
                                            type: "refund",
                                            message: `refund for gameId=${gameId}, characterId=${winnerId}. No one win this game.`,
                                            value: refundAmount,
                                            fee: 0,
                                            txHash: null,
                                            preBalance: currentBalance,
                                            postBalance: currentBalance + refundAmount,
                                            createdAt: +dayjs(),
                                        },
                                        {
                                            transaction: trans,
                                        }
                                    )
                                );
                                promisesAfterGameResult.push(
                                    models.wallets.update(
                                        {
                                            balance: currentBalance + refundAmount,
                                            updatedAt: +dayjs(),
                                        },
                                        {
                                            where: {
                                                id: +currentBet.walletId,
                                            },
                                            transaction: trans,
                                        }
                                    )
                                );
                            }
                            //update win-lost count for characters
                            promisesAfterGameResult.push(
                                models.characters.update(
                                    {
                                        win: sequelize.literal(`win + 1`),
                                        updatedAt: +dayjs(),
                                    },
                                    {
                                        where: {
                                            id: winnerId,
                                        },
                                        transaction: trans,
                                    }
                                )
                            );
                        } else {
                            //we have a winner
                            const totalBetAmountRaw = +totalBetAmount[0].amount;
                            let totalBetAmountFinal =
                                (totalBetAmountRaw * (100 - config.game.systemComBetTypeAgainstOthers)) / 100;
                            const totalWinAmountFinal = winners.reduce((total, item) => total + item.amount, 0);
                            logger.info(`totalBetAmountRaw=${totalBetAmountRaw}`);
                            logger.info(`totalWinAmountFinal=${totalWinAmountFinal}`);
                            let rateWin = totalBetAmountFinal / totalWinAmountFinal;
                            logger.info(`rateWin=${rateWin}`);
                            for (let index = 0; index < winners.length; index++) {
                                const currentWinner = winners[index];
                                const currentBalance = +currentWinner.wallet.balance;
                                const winAmount = +currentWinner.amount * rateWin || 0;
                                logger.info(`userId=${+currentWinner.userId} got winAmount=${winAmount}`);
                                promisesAfterGameResult.push(
                                    models.transactions.create(
                                        {
                                            userId: +currentWinner.userId,
                                            walletId: +currentWinner.walletId,
                                            tokenId: 1, //only BUSD
                                            type: "reward",
                                            message: `reward for winner for gameId=${gameId}, characterId=${winnerId}`,
                                            value: winAmount,
                                            fee: 0,
                                            txHash: null,
                                            preBalance: currentBalance,
                                            postBalance: currentBalance + winAmount,
                                            createdAt: +dayjs(),
                                        },
                                        {
                                            transaction: trans,
                                        }
                                    )
                                );
                                promisesAfterGameResult.push(
                                    models.wallets.update(
                                        {
                                            balance: currentBalance + winAmount,
                                            updatedAt: +dayjs(),
                                        },
                                        {
                                            where: {
                                                id: +currentWinner.walletId,
                                            },
                                            transaction: trans,
                                        }
                                    )
                                );
                            }
                        }
                    } else {
                        logger.warn(`updateGameResult got exception: not support this game type at gameId=${gameId}`);
                        return false;
                    }
                }
                //update win-lost count for characters
                promisesAfterGameResult.push(
                    models.characters.update(
                        {
                            win: sequelize.literal(`win + 1`),
                            updatedAt: +dayjs(),
                        },
                        {
                            where: {
                                id: winnerId,
                            },
                            transaction: trans,
                        }
                    )
                );
                let lostCharactersThisGameTemp = [];
                lostCharactersThisGameTemp.push(+thisGame.firstCharacterId);
                lostCharactersThisGameTemp.push(+thisGame.secondCharacterId);
                lostCharactersThisGameTemp.push(+thisGame.thirdCharacterId);
                lostCharactersThisGameTemp.push(+thisGame.fourthCharacterId);
                let lostCharactersThisGame = lostCharactersThisGameTemp.filter((item) => item !== winnerId);
                for (let index = 0; index < lostCharactersThisGame.length; index++) {
                    const loserId = lostCharactersThisGame[index];
                    promisesAfterGameResult.push(
                        models.characters.update(
                            {
                                lost: sequelize.literal(`lost + 1`),
                                updatedAt: +dayjs(),
                            },
                            {
                                where: {
                                    id: loserId,
                                },
                                transaction: trans,
                            }
                        )
                    );
                }

                await Promise.all(promisesAfterGameResult);
                trans.afterCommit(() => {
                    logger.info(`updateGameResult success for gameId=${gameId}, winnerId=${winnerId}...`);
                });
            });
            return true;
        } else {
            logger.warn(`updateGameResult got exception: gameId=${gameId} are wrong or not yet finished`);
            return false;
        }
    } catch (exception) {
        logger.warn("updateGameResult got exception:" + exception);
        return false;
    }
};

module.exports = updateGameResult;
