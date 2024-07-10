require("module-alias/register");
const logger = require("@logger");
const { models, Op } = require("@mysql/index");
const config = require("@config");

const gameEstimate = async (userId) => {
    try {
        const getCurrentGame = await models.games.findOne({
            where: {
                status: {
                    [Op.in]: ["pending", "starting"],
                },
            },
            order: [["id", "DESC"]],
        });

        if (!getCurrentGame) {
            return {
                estimate_cashout: 0,
                quote: 0,
                bet_amount: 0,
            };
        } else {
            const [userBetForGame, allBetForGame] = await Promise.all([
                models.betHistory.findAll({
                    where: {
                        userId: userId,
                        gameId: +getCurrentGame.id,
                    },
                }),
                models.betHistory.findAll({
                    where: {
                        gameId: +getCurrentGame.id,
                    },
                }),
            ]);

            if (!userBetForGame || !userBetForGame[0] || !allBetForGame) {
                return {
                    estimate_cashout: 0,
                    quote: 0,
                    bet_amount: 0,
                };
            } else {
                const allAlly = await models.betHistory.findAll({
                    where: {
                        gameId: +getCurrentGame.id,
                        characterId: +userBetForGame[0].characterId,
                    },
                });
                let totalBetForGameByAll = allBetForGame.reduce((total, item) => total + item.amount, 0);
                let totalBetForGameByUser = userBetForGame.reduce((total, item) => total + item.amount, 0);
                let totalBetForGameByAlly = allAlly.reduce((total, item) => total + item.amount, 0);
                let rateWin = 0;
                switch (getCurrentGame.type) {
                    case "against_system":
                        switch (+userBetForGame[0].characterId) {
                            case getCurrentGame.firstCharacterId:
                                rateWin = +getCurrentGame.rateFirst;
                                break;
                            case getCurrentGame.secondCharacterId:
                                rateWin = +getCurrentGame.rateSecond;
                                break;
                            case getCurrentGame.thirdCharacterId:
                                rateWin = +getCurrentGame.rateThird;
                                break;
                            case getCurrentGame.fourthCharacterId:
                                rateWin = +getCurrentGame.rateFourth;
                                break;
                            default:
                                break;
                        }
                        break;

                    case "against_others":
                        const amountToWin =
                            (totalBetForGameByAll * (100 - config.game.systemComBetTypeAgainstOthers)) / 100;
                        rateWin = amountToWin / totalBetForGameByAlly;
                        break;

                    default:
                        break;
                }

                return {
                    bet_amount: +totalBetForGameByUser,
                    quote: +rateWin,
                    estimate_cashout: +rateWin * +totalBetForGameByUser,
                };
            }
        }
    } catch (exception) {
        logger.warn("gameEstimate got exception:" + exception);
        return [];
    }
};

module.exports = gameEstimate;
