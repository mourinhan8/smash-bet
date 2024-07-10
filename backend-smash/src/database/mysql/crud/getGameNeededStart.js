require("module-alias/register");
const logger = require("@logger");
const { models, Op } = require("@mysql/index");
const dayjs = require("dayjs");

const getGameNeededStart = async () => {
    try {
        const neededActiveGame = await models.games.findOne({
            where: {
                status: "pending",
                startedAt: {
                    [Op.lte]: +dayjs(),
                },
            },
            order: [["id", "DESC"]],
        });

        return neededActiveGame;
    } catch (exception) {
        logger.warn("getGameNeededStart got exception:" + exception);
        return null;
    }
};

module.exports = getGameNeededStart;
