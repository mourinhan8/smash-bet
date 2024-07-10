const handlerCompleted = (job) => {
    console.info(`message saving handling id:${job.id} has completed`);
    job.remove();
};

const handlerFailure = (job, err) => {
    console.info(`message saving handling failed for: ${job.id} with ${err}. `);
};

const handlerStalled = (job) => {
    console.info(`message saving handling stalled for: ${job.id}`);
};

module.exports = {
    handlerCompleted,
    handlerFailure,
    handlerStalled,
};
