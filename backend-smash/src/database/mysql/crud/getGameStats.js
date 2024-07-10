require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getGameStats = async (limit, currentPage) => {
    try {
        const page = +(currentPage || 1);
        const pageSize = +(limit || 10);

        const gameStats = await models.games.findAndCountAll({
            where: {
                // status: "ending",
            },
            attributes: [
                "id",
                "type",
                "streamUrl",
                "firstCharacterId",
                "rateFirst",
                "secondCharacterId",
                "rateSecond",
                "thirdCharacterId",
                "rateThird",
                "fourthCharacterId",
                "rateFourth",
                "createdAt",
                "startedAt",
                "finishedAt",
                "status",
                "winnerId",
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["id", "DESC"]],
        });

        return {
            games: gameStats.rows,
            total: +gameStats.count,
            totalPages: Math.ceil(+gameStats.count / pageSize),
            currentPage: page,
        };
    } catch (exception) {
        logger.warn("getGameStats got exception:" + exception);
        return [];
    }
};

module.exports = getGameStats;
