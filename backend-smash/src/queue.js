require("module-alias/register");
const indexingEventProcess = require("@queue/indexing/indexingEvent.process");
const indexingEventQueue = require("@queue/indexing/indexingEvent.queue");
const withdrawProcess = require("@queue/withdraw/withdraw.process");
const withdrawQueue = require("@queue/withdraw/withdraw.queue");
const messageSavingProcess = require("@queue/message/messageSaving.process");
const messageSavingQueue = require("@queue/message/messageSaving.queue");
const logger = require("@logger");

indexingEventQueue.process(
    1, //concurrency
    function async(job, done) {
        indexingEventProcess(job.data);
        done();
    }
);

logger.info(`indexingEventQueue has started...`);

withdrawQueue.process(
    1, //concurrency
    function async(job, done) {
        withdrawProcess(job.data);
        done();
    }
);

logger.info(`withdrawQueue has started...`);

messageSavingQueue.process(
    1, //concurrency
    function async(job, done) {
        messageSavingProcess(job.data);
        done();
    }
);

logger.info(`messageSavingQueue has started...`);
