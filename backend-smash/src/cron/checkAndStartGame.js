require("module-alias/register");
const logger = require("@logger");
const getGameNeededStart = require("@mysql/crud/getGameNeededStart");
const dayjs = require("dayjs");

const checkAndStartGame = async () => {
    try {
        const gameNeededStart = await getGameNeededStart();
        if (!gameNeededStart) {
            logger.info(`cannot find any game needed start. Just relax...`);
            return true;
        } else {
            gameNeededStart.status = "starting";
            gameNeededStart.activedAt = +dayjs();
            await gameNeededStart.save();
            return true;
        }
    } catch (error) {
        logger.warn(`checkAndStartGame got exception: ${error}`);
        return false;
    }
};

module.exports = checkAndStartGame;
