require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const createNewGame = async (request) => {
    let code = 400,
        data = "something wrong";
    try {
        const gameType = request.gameType;
        const firstCharacterId = request.firstCharacterId;
        const rateFirst = request.rateFirst;
        const secondCharacterId = request.secondCharacterId;
        const rateSecond = request.rateSecond;
        const thirdCharacterId = request.thirdCharacterId;
        const rateThird = request.rateThird;
        const fourthCharacterId = request.fourthCharacterId;
        const rateFourth = request.rateFourth;
        const streamUrl = request.streamUrl;
        const startedAt = request.startedAt;
        const finishedAt = request.finishedAt;

        if (gameType === "against_system")
            if (
                !isNaN(firstCharacterId) &&
                !isNaN(rateFirst) &&
                !isNaN(secondCharacterId) &&
                !isNaN(rateSecond) &&
                !isNaN(thirdCharacterId) &&
                !isNaN(rateThird) &&
                !isNaN(fourthCharacterId) &&
                !isNaN(rateFourth) &&
                streamUrl &&
                !isNaN(startedAt) &&
                !isNaN(finishedAt) &&
                +startedAt > +dayjs() &&
                +finishedAt > +startedAt
            ) {
                const allTimes = await models.games.findAll({
                    where: {
                        status: "pending",
                    },
                    attributes: ["startedAt", "finishedAt"],
                });
                let checkValidNewGame = false;
                if (allTimes == null || allTimes.length === 0) {
                    checkValidNewGame = true;
                } else {
                    if (allTimes.length == 1) {
                        if (allTimes[0] <= startedAt) {
                            checkValidNewGame = true;
                        }
                    } else {
                        let times = [];
                        for (let index = 0; index < allTimes.length; index++) {
                            const element = allTimes[index];
                            times.push(element.startedAt);
                            times.push(element.finishedAt);
                        }
                        let timesOrdered = times.sort((a, b) => a - b);
                        if (timesOrdered[timesOrdered.length - 1] <= startedAt || timesOrdered[0] >= finishedAt)
                            checkValidNewGame = true;
                        for (let index = 0; index < timesOrdered.length - 1; index++) {
                            const currentItem = timesOrdered[index];
                            const nextItem = timesOrdered[index + 1];
                            if (currentItem <= startedAt && startedAt <= nextItem) {
                                if (currentItem <= finishedAt && finishedAt <= nextItem) {
                                    checkValidNewGame = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (checkValidNewGame) {
                    await models.games.create({
                        type: gameType,
                        firstCharacterId: +firstCharacterId,
                        rateFirst: +rateFirst,
                        secondCharacterId: +secondCharacterId,
                        rateSecond: +rateSecond,
                        thirdCharacterId: +thirdCharacterId,
                        rateThird: +rateThird,
                        fourthCharacterId: +fourthCharacterId,
                        rateFourth: +rateFourth,
                        streamUrl: streamUrl,
                        status: "pending",
                        firstCharacterId: +firstCharacterId,
                        createdAt: +dayjs(),
                        startedAt: +startedAt,
                        finishedAt: +finishedAt,
                    });
                    code = 200;
                    data = "success";
                } else {
                    logger.warn(
                        `createNewGame got exception: checkValidNewGame was failed with startedAt = ${startedAt} --> finishedAt=${finishedAt}`
                    );
                    code = 400;
                    data = "the time values of startedAt and finishedAt conflict with the current games";
                }
            } else {
                code = 400;
                data = "all fields except streamUrl must be a number and now < startedAt < finishedAt is required";
            }
        else {
            if (gameType === "against_others")
                if (
                    !isNaN(firstCharacterId) &&
                    !isNaN(secondCharacterId) &&
                    !isNaN(thirdCharacterId) &&
                    !isNaN(fourthCharacterId) &&
                    streamUrl &&
                    !isNaN(startedAt) &&
                    !isNaN(finishedAt) &&
                    +startedAt > +dayjs() &&
                    +finishedAt > +startedAt
                ) {
                    const allTimes = await models.games.findAll({
                        where: {
                            status: "pending",
                        },
                        attributes: ["startedAt", "finishedAt"],
                    });
                    let checkValidNewGame = false;
                    if (allTimes == null || allTimes.length === 0) {
                        checkValidNewGame = true;
                    } else {
                        if (allTimes.length == 1) {
                            if (allTimes[0] <= startedAt) {
                                checkValidNewGame = true;
                            }
                        } else {
                            let times = [];
                            for (let index = 0; index < allTimes.length; index++) {
                                const element = allTimes[index];
                                times.push(element.startedAt);
                                times.push(element.finishedAt);
                            }
                            let timesOrdered = times.sort((a, b) => a - b);
                            if (timesOrdered[timesOrdered.length - 1] <= startedAt || timesOrdered[0] >= finishedAt)
                                checkValidNewGame = true;
                            for (let index = 0; index < timesOrdered.length - 1; index++) {
                                const currentItem = timesOrdered[index];
                                const nextItem = timesOrdered[index + 1];
                                if (currentItem <= startedAt && startedAt <= nextItem) {
                                    if (currentItem <= finishedAt && finishedAt <= nextItem) {
                                        checkValidNewGame = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    if (checkValidNewGame) {
                        await models.games.create({
                            type: gameType,
                            firstCharacterId: +firstCharacterId,
                            rateFirst: 1,
                            secondCharacterId: +secondCharacterId,
                            rateSecond: 1,
                            thirdCharacterId: +thirdCharacterId,
                            rateThird: 1,
                            fourthCharacterId: +fourthCharacterId,
                            rateFourth: 1,
                            streamUrl: streamUrl,
                            status: "pending",
                            firstCharacterId: +firstCharacterId,
                            createdAt: +dayjs(),
                            startedAt: +startedAt,
                            finishedAt: +finishedAt,
                        });
                        code = 200;
                        data = "success";
                    } else {
                        logger.warn(
                            `createNewGame got exception: checkValidNewGame was failed with startedAt = ${startedAt} --> finishedAt=${finishedAt}`
                        );
                        code = 400;
                        data = "the time values of startedAt and finishedAt conflict with the current games";
                    }
                } else {
                    code = 400;
                    data = "all fields except streamUrl must be a number and now < startedAt < finishedAt is required";
                }
        }
        return { code, data };
    } catch (exception) {
        logger.warn("createNewGame got exception:" + exception);
        return { code, data };
    }
};

module.exports = createNewGame;
