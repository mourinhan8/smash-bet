require("module-alias/register");
const Bull = require("bull");
const config = require("@config");
const { handlerFailure, handlerCompleted, handlerStalled } = require("./indexingEvent.handler");

const indexingEventQueue = new Bull("indexingDepositEventSmashShadown", {
    redis: config.redis,
});

indexingEventQueue.on("completed", handlerCompleted);

indexingEventQueue.on("error", handlerFailure);

indexingEventQueue.on("failed", handlerStalled);

module.exports = indexingEventQueue;
