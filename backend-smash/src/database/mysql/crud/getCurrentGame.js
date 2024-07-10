require("module-alias/register");
const logger = require("@logger");
const { models, Op } = require("@mysql/index");
const dayjs = require("dayjs");

const getCurrentGame = async () => {
    try {
        const currentGame = await models.games.findOne({
            where: {
                status: "starting",
                startedAt: {
                    [Op.lte]: +dayjs(),
                },
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
                "status",
                "createdAt",
                "startedAt",
                "finishedAt",
            ],
            order: [["id", "DESC"]],
        });

        return currentGame;
    } catch (exception) {
        logger.warn("getCurrentGame got exception:" + exception);
        return null;
    }
};

module.exports = getCurrentGame;
