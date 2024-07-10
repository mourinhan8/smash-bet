require("module-alias/register");
const router = require("express").Router();
const { authenticate, verifyToken } = require("@middleware/auth");
const { verifySecret } = require("@middleware/admin");
const userController = require("@controller/user");
const gameController = require("@controller/game");
const characterController = require("@controller/character");
const adminController = require("@controller/admin");
const authController = require("@controller/auth");
const messageController = require("@controller/message");

router.post("/users/create", userController.createUser);
router.get("/users/info", userController.getUserInfo);
router.get("/users/bet-history", userController.getBetHistory);
router.post("/users/withdraw", userController.createWithdrawRequest);
router.get("/user/games-stats", userController.getGamesStats);
router.get("/user/transactions", userController.getUserTransaction);
router.get("/user/total-value-transactions", userController.getTotalValueByTransaction);

router.get("/games/stats", gameController.getGamesStat);
router.get("/games/next", gameController.nextGame);
router.post("/games/place-bet", gameController.placeBet);
router.get("/games/bet-for-character", gameController.betForCharacter);
router.get("/games/get-current-game", adminController.getCurrentGame);
router.get("/games/estimate", gameController.getEstimate);

router.get("/characters/get-all", characterController.getAllCharacters);
router.post("/characters/update", authenticate(true), characterController.updateCharacterInfo);

router.post("/admin/login", adminController.login);
router.post("/admin/verify2fa", verifyToken(true), adminController.verifyOTP);
router.post("/admin/game-result", authenticate(true), adminController.updateGameResult);
router.get("/admin/get-winners", authenticate(true), adminController.getWinnerInfo);
router.post("/admin/create", verifySecret(), adminController.create);
router.post("/admin/game-create", authenticate(true), adminController.createNewGame);
router.get("/admin/get-current-game", authenticate(true), adminController.getCurrentGame);
router.get("/admin/me", authenticate(true), adminController.adminDetail);
router.get("/admin/get-withdraw-request", authenticate(true), adminController.getWithdrawRequest);
router.post("/admin/resolve-withdraw-request", authenticate(true), adminController.adminCheckRequest);

router.get("/auth/nonce", authController.nonce);
router.post("/auth/verify", authController.verify);
router.get("/auth/secret", authController.secret);

router.get("/chat/message", messageController.getMessage);

module.exports = router;
