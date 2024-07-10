require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getWinnerIdForGameId = async (gameId) => {
    try {
        const winner = await models.games.findOne({
            where: {
                id: +gameId,
            },
            attributes: ["winnerId"],
        });

        return winner.winnerId;
    } catch (exception) {
        logger.warn("getWinnerIdForGameId got exception:" + exception);
        return null;
    }
};

module.exports = getWinnerIdForGameId;
