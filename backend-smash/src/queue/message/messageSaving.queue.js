require("module-alias/register");
const Bull = require("bull");
const config = require("@config");
const { handlerFailure, handlerCompleted, handlerStalled } = require("./messageSaving.handler");

const messageSavingQueue = new Bull("messageSavingSmashShadow", {
    redis: config.redis,
});

messageSavingQueue.on("completed", handlerCompleted);

messageSavingQueue.on("error", handlerFailure);

messageSavingQueue.on("failed", handlerStalled);

module.exports = messageSavingQueue;
