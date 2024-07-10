require("module-alias/register");
const logger = require("@logger");
const { models, sequelize, Op } = require("@mysql/index");
const dayjs = require("dayjs");
const config = require("@config");

const createBet = async (gameId, userId, characterId, amount) => {
    let returnData = {
        result: false,
        message: "",
    };
    try {
        const [checkUserExisted, checkGameExisted, checkBalance, checkAnyBetBefore, allBets] = await Promise.all([
            models.users.findOne({
                where: {
                    id: userId,
                },
            }),
            models.games.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: gameId,
                        },
                        {
                            status: "pending",
                        },
                        {
                            [Op.or]: [
                                { firstCharacterId: characterId },
                                { secondCharacterId: characterId },
                                { thirdCharacterId: characterId },
                                { fourthCharacterId: characterId },
                            ],
                        },
                    ],
                },
            }),
            models.wallets.findOne({
                where: {
                    [Op.and]: [
                        {
                            userId: userId,
                            tokenId: 1,
                        },
                        {
                            balance: {
                                [Op.gte]: amount,
                            },
                        },
                    ],
                },
            }),
            models.betHistory.findOne({
                where: {
                    userId: userId,
                    gameId: gameId,
                },
            }),
            models.betHistory.findAll({
                where: {
                    userId: userId,
                    gameId: gameId,
                },
            }),
        ]);

        if (!checkUserExisted) {
            logger.warn(`createBet exeption: user is not existed`);
            returnData.result = false;
            returnData.message = `user is not existed`;
            return returnData;
        }
        if (!checkGameExisted) {
            logger.warn(`createBet exeption: game is not valid with gameId=${gameId}, characterId=${characterId}`);
            returnData.result = false;
            returnData.message = `game is not valid with gameId=${gameId}, characterId=${characterId}`;
            return returnData;
        }
        if (!checkBalance) {
            logger.warn(`createBet exeption: balance is not enough for bet`);
            returnData.result = false;
            returnData.message = `balance is not enough for bet`;
            return returnData;
        }
        if (checkGameExisted.type === "against_others") {
            if (+amount != +config.game.amountBetTypeAgainstOthers) {
                logger.warn(
                    `createBet exeption: bet against others require amount must be equal ${config.game.amountBetTypeAgainstOthers}$`
                );
                returnData.result = false;
                returnData.message = `bet against others require amount must be equal ${config.game.amountBetTypeAgainstOthers}$`;
                return returnData;
            }
        }

        if (checkAnyBetBefore) {
            if (+characterId != +checkAnyBetBefore.characterId) {
                logger.warn(`createBet exeption: an user cannot bet for more than one character`);
                returnData.result = false;
                returnData.message = `an user cannot bet for more than one character`;
                return returnData;
            }
        }

        let totalBetAmount = 0;
        for (let index = 0; index < allBets.length; index++) {
            totalBetAmount += +allBets[index].amount;
        }
        if (totalBetAmount + amount > +config.game.maximumBetEachGame) {
            logger.warn(
                `createBet exeption: an user cannot bet for more than ${+config.game.maximumBetEachGame}$ on each game`
            );
            returnData.result = false;
            returnData.message = `an user cannot bet for more than ${+config.game.maximumBetEachGame}$ on each game`;
            return returnData;
        }

        await sequelize.transaction(async (trans) => {
            //create transaction
            await models.transactions.create(
                {
                    userId: userId,
                    walletId: checkBalance?.id,
                    tokenId: 1, //only BUSD
                    type: "bet",
                    message: `place bet gameId=${gameId}, characterId=${characterId}`,
                    value: amount,
                    fee: 0,
                    txHash: null,
                    preBalance: +checkBalance.balance,
                    postBalance: +checkBalance.balance - amount,
                    createdAt: +dayjs(),
                },
                {
                    transaction: trans,
                }
            );

            //create bet
            await models.betHistory.create(
                {
                    userId: userId,
                    walletId: checkBalance?.id,
                    tokenId: 1,
                    amount: amount,
                    gameId: gameId,
                    characterId: characterId,
                    createdAt: +dayjs(),
                },
                {
                    transaction: trans,
                }
            );

            //update wallet balance
            checkBalance.balance -= amount;
            checkBalance.updatedAt = +dayjs();
            await checkBalance.save({ transaction: trans });

            trans.afterCommit(() => {
                logger.info(
                    `createBet success for userId = ${userId}, gameId=${gameId}, characterId=${characterId} with amount=${amount}`
                );
            });
        });
        returnData.result = true;
        returnData.message = `OK`;
        return returnData;
    } catch (exception) {
        logger.warn("createBet got exception:" + exception);
        returnData.result = false;
        returnData.message = `${exception}`;
        return returnData;
    }
};

module.exports = createBet;
