const config = require("../config/app.config");
const { MongoClient } = require("mongodb");
const logger = require("../logger/logger");
const getMongoDB = async () => {
    try {
        //const client = new MongoClient(config.mongo.uri);
        const client = new MongoClient(`mongodb://${config.mongo.url}?authSource=${config.mongo.authsource}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        logger.info("Connected successfully to MongoDB");
        return client;
    } catch (exception) {
        logger.warn("getMongoDB got exception:", exception);
    }
};
module.exports = getMongoDB;
