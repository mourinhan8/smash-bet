require("module-alias/register");
const logger = require("@logger");
const updateGameResult = require("@mysql/crud/updateGameResult");
const getWinnerIdForGameId = require("@mysql/crud/getWinnerIdForGameId");
const getWinAddressesWithAmounts = require("@mysql/crud/getWinAddressesWithAmounts");
const { getAdminByEmail, getAdminById, getGoogleAuthen } = require("@mysql/crud/getAdmin");
const { updateIsGoogleAuthen } = require("@mysql/crud/updateAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAdmin = require("@mysql/crud/createAdmin");
const speakeasy = require("speakeasy");
const cryptr = require("@lib/cryptrUtils");
const getCurrentGame = require("@mysql/crud/getCurrentGame");
const createNewGame = require("@mysql/crud/createNewGame");
const getWithdrawRequest = require("@mysql/crud/getWithdrawRequest");
const resolveWithdrawRequest = require("@mysql/crud/resolveWithdrawRequest");

const admin = {
    updateGameResult: async (req, res) => {
        try {
            const urlBody = req.body;
            const gameId = +urlBody.gameId;
            const winnerId = +urlBody.winnerId;
            if (gameId > 0 && winnerId > 0) {
                const updated = await updateGameResult(gameId, winnerId);
                if (updated) {
                    return res.status(200).json({
                        code: "OK",
                    });
                } else {
                    return res.status(500).json({
                        code: "NOK",
                    });
                }
            } else {
                return res.status(401).json({
                    code: "NOK",
                });
            }
        } catch (exception) {
            logger.warn(`adminController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    getCurrentGame: async (req, res) => {
        try {
            const currentGame = await getCurrentGame();
            return res.status(200).json({
                code: "OK",
                data: {
                    games: currentGame,
                },
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

    getWithdrawRequest: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const pageSize = urlParams.get("pageSize");
            const page = urlParams.get("page");
            const userWallet = (urlParams.get("userWallet") || "").toLowerCase();
            const status = (urlParams.get("status") || "").toLowerCase();
            const withdrawRequests = await getWithdrawRequest(pageSize, page, userWallet, status);
            return res.status(200).json({
                code: "OK",
                data: withdrawRequests,
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

    adminCheckRequest: async (req, res) => {
        try {
            const urlBody = req.body;
            const requestId = +urlBody.requestId;
            const result = urlBody.result;
            if (result != "approved" && result != "rejected") {
                return res.status(400).json({
                    code: "NOK",
                    data: "only accept for approved or rejected",
                });
            }
            const saveConclude = await resolveWithdrawRequest(requestId, result);
            if (saveConclude != null) {
                return res.status(200).json({
                    code: "OK",
                    data: saveConclude,
                });
            } else {
                return res.status(500).json({
                    code: "NOK",
                    data: "fail",
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

    createNewGame: async (req, res) => {
        try {
            const urlBody = req.body;
            const createGame = await createNewGame(urlBody);
            const { code, data } = createGame;
            if (code && data) {
                if (+code == 200) {
                    return res.status(+code).json({
                        code: "OK",
                        data: data,
                    });
                } else {
                    return res.status(+code).json({
                        code: "NOK",
                        data: data,
                    });
                }
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

    getWinnerInfo: async (req, res) => {
        try {
            const urlBody = req.body;
            const gameId = +urlBody.gameId;
            //get winners addresses and amounts payment
            const winnerId = await getWinnerIdForGameId(gameId);
            if (winnerId) {
                const winners = await getWinAddressesWithAmounts(gameId, winnerId);
                const { addresses, amounts } = winners;
                return res.status(200).json({
                    code: "OK",
                    data: {
                        addresses: addresses,
                        amounts: amounts,
                    },
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: {
                        message: "gameId is not existed",
                    },
                });
            }
        } catch (exception) {
            logger.warn(`adminController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    create: async (req, res) => {
        try {
            const { email, password } = req.body;
            const newAdmin = await createAdmin(email, password);
            if (!newAdmin) {
                return res.status(400).json({
                    code: "NOK",
                    data: "create fail",
                });
            }
            if (newAdmin == "existed") {
                return res.status(400).json({
                    code: "NOK",
                    data: "email existed",
                });
            }
            return res.status(200).json({
                code: "OK",
                data: "success",
            });
        } catch (exception) {
            logger.warn(`adminController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const adminInfo = await getAdminByEmail(email);
            if (!adminInfo) {
                return res.status(400).json({
                    code: "NOK",
                    data: {
                        message: "account is not exist",
                    },
                });
            }
            const comparePassword = await bcrypt.compare(password, adminInfo.password);
            if (!comparePassword) {
                return res.status(400).json({
                    code: "NOK",
                    data: {
                        message: "invalid password",
                    },
                });
            }
            const response = {};
            if (!adminInfo.isGoogleAuthen) {
                const { base32, otpauth_url } = JSON.parse(cryptr.decrypt(adminInfo.googleSecret));
                response.message = "requiredGoogleAuthen";
                response.base32 = base32;
                response.url = otpauth_url;
            }
            const token = jwt.sign({ id: adminInfo.id }, process.env.PUBLIC_KEY, {
                expiresIn: "1440m",
            });
            response.token = token;
            return res.status(200).json({
                code: "OK",
                data: response,
            });
        } catch (exception) {
            logger.warn(`adminController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
    verifyOTP: async (req, res) => {
        try {
            const { otp } = req.body;
            const adminId = req?.["verifyData"]?.id;
            const { googleSecretAscii, isGoogleAuthen } = await getGoogleAuthen(adminId);
            const googleAuthenVerify = speakeasy.totp.verify({
                secret: googleSecretAscii,
                encoding: "ascii",
                token: otp,
            });
            if (!googleAuthenVerify) {
                return res.status(400).json({
                    code: "NOK",
                    message: "OTP incorrect",
                });
            }
            if (!isGoogleAuthen) {
                await updateIsGoogleAuthen(adminId, true);
            }
            const token = jwt.sign({ id: adminId }, process.env.PRIVATE_KEY, { expiresIn: "15d" });

            return res.status(200).json({
                code: "OK",
                data: { token },
            });
        } catch (error) {
            logger.warn(`adminController got exception:${error}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(error),
                },
            });
        }
    },
    adminDetail: async (req, res) => {
        try {
            const adminId = req?.["authData"]?.id;
            const adminInfo = await getAdminById(adminId);
            if (!adminInfo) {
                return res.status(400).json({
                    code: "NOK",
                    data: "user not found",
                });
            }
            return res.status(200).json({
                code: "OK",
                data: {
                    email: adminInfo.email,
                    wallet: adminInfo.wallet,
                },
            });
        } catch (exception) {
            logger.warn(`adminController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
};

module.exports = admin;
