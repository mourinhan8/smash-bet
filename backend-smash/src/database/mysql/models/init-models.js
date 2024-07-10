var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _betHistory = require("./betHistory");
var _characters = require("./characters");
var _contracts = require("./contracts");
var _games = require("./games");
var _refs = require("./refs");
var _tokens = require("./tokens");
var _transactions = require("./transactions");
var _users = require("./users");
var _wallets = require("./wallets");
var _withdrawRequest = require("./withdrawRequest");
var _chatMessage = require("./chatMessage");

function initModels(sequelize) {
    var admin = _admin(sequelize, DataTypes);
    var betHistory = _betHistory(sequelize, DataTypes);
    var characters = _characters(sequelize, DataTypes);
    var contracts = _contracts(sequelize, DataTypes);
    var games = _games(sequelize, DataTypes);
    var refs = _refs(sequelize, DataTypes);
    var tokens = _tokens(sequelize, DataTypes);
    var transactions = _transactions(sequelize, DataTypes);
    var users = _users(sequelize, DataTypes);
    var wallets = _wallets(sequelize, DataTypes);
    var withdrawRequest = _withdrawRequest(sequelize, DataTypes);
    var chatMessage = _chatMessage(sequelize, DataTypes);

    betHistory.belongsTo(characters, { as: "character", foreignKey: "characterId" });
    characters.hasMany(betHistory, { as: "betHistories", foreignKey: "characterId" });
    games.belongsTo(characters, { as: "firstCharacter", foreignKey: "firstCharacterId" });
    characters.hasMany(games, { as: "games", foreignKey: "firstCharacterId" });
    games.belongsTo(characters, { as: "fourthCharacter", foreignKey: "fourthCharacterId" });
    characters.hasMany(games, { as: "fourthCharacterGames", foreignKey: "fourthCharacterId" });
    games.belongsTo(characters, { as: "secondCharacter", foreignKey: "secondCharacterId" });
    characters.hasMany(games, { as: "secondCharacterGames", foreignKey: "secondCharacterId" });
    games.belongsTo(characters, { as: "thirdCharacter", foreignKey: "thirdCharacterId" });
    characters.hasMany(games, { as: "thirdCharacterGames", foreignKey: "thirdCharacterId" });
    games.belongsTo(characters, { as: "winner", foreignKey: "winnerId" });
    characters.hasMany(games, { as: "winnerGames", foreignKey: "winnerId" });
    tokens.belongsTo(contracts, { as: "chainNameContract", foreignKey: "chainName" });
    contracts.hasMany(tokens, { as: "tokens", foreignKey: "chainName" });
    tokens.belongsTo(contracts, { as: "chain", foreignKey: "chainId" });
    contracts.hasMany(tokens, { as: "chainTokens", foreignKey: "chainId" });
    betHistory.belongsTo(games, { as: "game", foreignKey: "gameId" });
    games.hasMany(betHistory, { as: "betHistories", foreignKey: "gameId" });
    betHistory.belongsTo(tokens, { as: "token", foreignKey: "tokenId" });
    tokens.hasMany(betHistory, { as: "betHistories", foreignKey: "tokenId" });
    withdrawRequest.belongsTo(tokens, { as: "token", foreignKey: "tokenId" });
    tokens.hasMany(withdrawRequest, { as: "withdrawRequests", foreignKey: "tokenId" });
    withdrawRequest.belongsTo(transactions, { as: "transaction", foreignKey: "transactionId" });
    transactions.hasMany(withdrawRequest, { as: "withdrawRequests", foreignKey: "transactionId" });
    betHistory.belongsTo(users, { as: "user", foreignKey: "userId" });
    users.hasMany(betHistory, { as: "betHistories", foreignKey: "userId" });
    refs.belongsTo(users, { as: "parent", foreignKey: "parentId" });
    users.hasMany(refs, { as: "refs", foreignKey: "parentId" });
    refs.belongsTo(users, { as: "user", foreignKey: "userId" });
    users.hasMany(refs, { as: "userRefs", foreignKey: "userId" });
    transactions.belongsTo(users, { as: "user", foreignKey: "userId" });
    users.hasMany(transactions, { as: "transactions", foreignKey: "userId" });
    wallets.belongsTo(users, { as: "user", foreignKey: "userId" });
    users.hasMany(wallets, { as: "wallets", foreignKey: "userId" });
    withdrawRequest.belongsTo(users, { as: "user", foreignKey: "userId" });
    users.hasMany(withdrawRequest, { as: "withdrawRequests", foreignKey: "userId" });
    betHistory.belongsTo(wallets, { as: "wallet", foreignKey: "walletId" });
    wallets.hasMany(betHistory, { as: "betHistories", foreignKey: "walletId" });
    transactions.belongsTo(wallets, { as: "wallet", foreignKey: "walletId" });
    wallets.hasMany(transactions, { as: "transactions", foreignKey: "walletId" });
    chatMessage.belongsTo(users, { as: "sender", foreignKey: "senderId" });
    users.hasMany(chatMessage, { as: "chatMessages", foreignKey: "senderId" });

    return {
        admin,
        betHistory,
        characters,
        contracts,
        games,
        refs,
        tokens,
        transactions,
        users,
        wallets,
        withdrawRequest,
        chatMessage,
        // sequelize,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
