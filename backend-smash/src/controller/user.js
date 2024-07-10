require("module-alias/register");
const logger = require("@logger");
const getUser = require("@mysql/crud/getUser");
const createUserAndWallet = require("@mysql/crud/createUserAndWallet");
const createWithdrawRequest = require("@mysql/crud/createWithdrawRequest");
const getBetHistoryUser = require("@mysql/crud/getBetHistoryUser");
const getGameStatsUser = require("@mysql/crud/getGameStatsUser");
const getUserTransactionsByType = require("@mysql/crud/getUserTransactionsByType");
const getTotalValueByTransactionType = require("@mysql/crud/getTotalValueByTransactionType");

const userController = {
    createUser: async (req, res) => {
        try {
            const urlBody = req.body;
            const walletAddress = (urlBody.walletAddress || "").toLowerCase();
            const newUser = await createUserAndWallet(walletAddress);
            if (newUser) {
                return res.status(200).json({
                    code: "OK",
                    data: "success",
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: "fail",
                });
            }
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    getUserInfo: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const walletAddress = (urlParams.get("wallet") || "").toLowerCase();
            const userInfo = await getUser(walletAddress);
            if (userInfo) {
                return res.status(200).json({
                    code: "OK",
                    data: userInfo,
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: null,
                });
            }
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    getBetHistory: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const userId = urlParams.get("userId");
            const pageSize = urlParams.get("pageSize");
            const page = urlParams.get("page");
            const betHistory = await getBetHistoryUser(userId, pageSize, page);
            if (betHistory) {
                return res.status(200).json({
                    code: "OK",
                    data: betHistory,
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: null,
                });
            }
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    createWithdrawRequest: async (req, res) => {
        try {
            const urlBody = req.body;
            const userId = urlBody.userId;
            const amount = urlBody.amount;
            const result = await createWithdrawRequest(+userId, +amount);
            if (result == "success") {
                return res.status(200).json({
                    code: "OK",
                    data: "success",
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: result,
                });
            }
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
    getGamesStats: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const userId = urlParams.get("userId");
            const stats = await getGameStatsUser(userId);
            return res.status(200).json({
                code: "OK",
                data: stats,
            });
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
    getUserTransaction: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const pageSize = urlParams.get("pageSize");
            const page = urlParams.get("page");
            const userId = urlParams.get("userId");
            const type = urlParams.get("type");
            const stats = await getUserTransactionsByType(userId, type, pageSize, page);
            return res.status(200).json({
                code: "OK",
                data: stats,
            });
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
    getTotalValueByTransaction: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const userId = urlParams.get("userId");
            const type = urlParams.get("type");
            const totalValue = await getTotalValueByTransactionType(userId, type);
            return res.status(200).json({
                code: "OK",
                data: +totalValue || 0,
            });
        } catch (exception) {
            logger.warn(`userController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
};

module.exports = userController;
