require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAllBetForCharacter = async (gameId, characterId) => {
    try {
        if (gameId && characterId) {
            const betHistory = await models.betHistory.findAll({
                where: {
                    gameId: +gameId,
                    characterId: +characterId,
                },
                include: [
                    {
                        as: "user",
                        model: models.users,
                        attributes: ["walletAddress"],
                    },
                ],
                order: [["id", "DESC"]],
            });
            let finalBets = [];
            for (let index = 0; index < betHistory.length; index++) {
                const item = betHistory[index];
                finalBets.push({
                    userWallet: item.user.walletAddress,
                    gameId: item.gameId,
                    characterId: item.characterId,
                    amount: item.amount,
                });
            }
            return finalBets;
        } else {
            const betHistory = await models.betHistory.findAll({
                where: {
                    gameId: gameId,
                },
                include: [
                    {
                        as: "user",
                        model: models.users,
                        attributes: ["walletAddress"],
                    },
                ],
                order: [["id", "DESC"]],
            });
            let finalBets = [];
            for (let index = 0; index < betHistory.length; index++) {
                const item = betHistory[index];
                finalBets.push({
                    userWallet: item.user.walletAddress,
                    gameId: item.gameId,
                    characterId: item.characterId,
                    amount: item.amount,
                });
            }
            return finalBets;
        }
    } catch (exception) {
        logger.warn("getAllBetForCharacter got exception:" + exception);
        return null;
    }
};

module.exports = getAllBetForCharacter;
