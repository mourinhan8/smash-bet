require("module-alias/register");
const logger = require("@logger");
const getGameStats = require("@mysql/crud/getGameStats");
const getNextGame = require("@mysql/crud/getNextGame");
const createBet = require("@mysql/crud/createBet");
const gameEstimate = require("@mysql/crud/gameEstimate");
const getAllBetForCharacter = require("@mysql/crud/getAllBetForCharacter");

const gameController = {
    getGamesStat: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const pageSize = urlParams.get("pageSize");
            const page = urlParams.get("page");
            const stats = await getGameStats(pageSize, page);

            return res.status(200).json({
                code: "OK",
                data: stats,
            });
        } catch (exception) {
            logger.warn(`gameController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    nextGame: async (req, res) => {
        try {
            const nextGame = await getNextGame();
            return res.status(200).json({
                code: "OK",
                data: nextGame,
            });
        } catch (exception) {
            logger.warn(`gameController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    placeBet: async (req, res) => {
        try {
            const urlBody = req.body;
            const userId = +urlBody.userId;
            const gameId = +urlBody.gameId;
            const characterId = +urlBody.characterId;
            const amount = +urlBody.amount;

            const tryMakeABet = await createBet(+gameId, +userId, +characterId, +amount);

            if (tryMakeABet && tryMakeABet.result) {
                return res.status(200).json({
                    code: "OK",
                    data: "success",
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: tryMakeABet.message,
                });
            }
        } catch (exception) {
            logger.warn(`gameController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    betForCharacter: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const gameId = urlParams.get("gameId");
            const characterId = urlParams.get("characterId");
            if (gameId && characterId) {
                const allBetForCharacter = await getAllBetForCharacter(+gameId, characterId);
                if (allBetForCharacter) {
                    return res.status(200).json({
                        code: "OK",
                        data: allBetForCharacter,
                    });
                } else {
                    return res.status(400).json({
                        code: "NOK",
                        data: "fail",
                    });
                }
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: "gameId or characterId must be provided",
                });
            }
        } catch (exception) {
            logger.warn(`gameController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    getEstimate: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const userId = urlParams.get("userId");

            const tryEstimate = await gameEstimate(+userId);

            if (tryEstimate) {
                return res.status(200).json({
                    code: "OK",
                    data: tryEstimate,
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: "fail",
                });
            }
        } catch (exception) {
            logger.warn(`getEstimate got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
};

module.exports = gameController;
