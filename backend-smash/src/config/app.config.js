require("module-alias/register");
require("dotenv").config();
const OffsetBlockChain = require("@blockchain/constant/OffsetBlockChain");

const config = {};

config.app = {
    port: process.env.PORT_APP,
    socketPort: process.env.PORT_SOCKET,
};

config.redis = {
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
};

config.mongo = {
    url: process.env.MONGODB_URL,
    authsource: process.env.MONGODB_AUTHSOURCE,
    uri: process.env.MONGO_DB_URI,
};

config.mysql = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT,
    dialect: "mysql",
};

config.telegram = {
    botToken: process.env.TELEGRAM_BOT_ID,
    chatId: process.env.TELEGRAM_CHAT_ID,
};

config.blockchain = {
    chainId: {
        bsc: process.env.BSC_CHAIN_ID,
        ethereum: process.env.ETH_CHAIN_ID,
        polygon: process.env.POLYGON_CHAIN_ID,
    },
    scanOffset: {
        ethereum: {
            testnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_ETH_TESTNET,
            mainnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_ETH_MAINNET,
        },
        bsc: {
            testnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_BSC_TESTNET,
            mainnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_BSC_MAINNET,
        },
        polygon: {
            testnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_POLYGON_TESTNET,
            mainnet: +OffsetBlockChain.SCAN_BLOCK_OFFSET_POLYGON_MAINNET,
        },
    },
    jumperBlock: process.env.JUMER_FROM_BLOCK,
    adminKey: process.env.PKEY_ADMIN,
};

config.crypto = {
    encryptKey: process.env.ENCRYPT_KEY,
};

config.game = {
    amountBetTypeAgainstOthers: process.env.AMOUNT_BET_TYPE_OTHERS || 100,
    systemComBetTypeAgainstOthers: process.env.SYSTEM_COM_BET_TYPE_OTHERS || 10,
    maximumBetEachGame: process.env.MAXIUMUM_BET_AMOUNT_EACH_GAME_EACH_USER || 400,
};

module.exports = config;
