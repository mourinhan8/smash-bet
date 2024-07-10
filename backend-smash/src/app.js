require("module-alias/register");
const express = require("express");
const logger = require("@logger");
const router = require("@router/router");
const config = require("@config");
const cors = require("cors");
const { mySqlConnect } = require("@mysql");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));

// Set routes after Socket.IO setup
app.use("/", router);

// Running app
app.listen(config.app.port, async () => {
    logger.info(`Server is running on port ${config.app.port}`);
    await Promise.all([mySqlConnect()]).then(async () => {
        logger.info(`Server is ready now...`);
    });
});
