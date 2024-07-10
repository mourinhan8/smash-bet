require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getBetHistoryUser = async (userId, limit, currentPage) => {
    try {
        const page = +(currentPage || 1);
        const pageSize = +(limit || 10);

        const betHistory = await models.betHistory.findAndCountAll({
            where: {
                userId: userId,
            },
            attributes: ["userId", "tokenId", "gameId", "characterId", "amount", "createdAt"],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["id", "DESC"]],
        });

        return {
            bets: betHistory.rows,
            total: +betHistory.count,
            totalPages: Math.ceil(+betHistory.count / pageSize),
            currentPage: page,
        };
    } catch (exception) {
        logger.warn("getBetHistoryUser got exception:" + exception);
        return null;
    }
};

module.exports = getBetHistoryUser;
