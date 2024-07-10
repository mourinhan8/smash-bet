require("module-alias/register");
const logger = require("@logger");
const { models, Op } = require("@mysql/index");
const dayjs = require("dayjs");

const getNextGame = async () => {
    try {
        const nextGame = await models.games.findOne({
            where: {
                status: "pending",
                startedAt: {
                    [Op.gte]: +dayjs(),
                },
            },
            attributes: [
                "id",
                "type",
                "firstCharacterId",
                "secondCharacterId",
                "thirdCharacterId",
                "fourthCharacterId",
                "status",
                "startedAt",
            ],
            order: [["startedAt", "ASC"]],
        });

        return {
            next: nextGame,
        };
    } catch (exception) {
        logger.warn("getNextGame got exception:" + exception);
        return null;
    }
};

module.exports = getNextGame;
