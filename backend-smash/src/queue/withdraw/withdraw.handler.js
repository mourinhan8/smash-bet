const handlerCompleted = (job) => {
    console.info(`withdraw handling id:${job.id} has completed`);
    job.remove();
};

const handlerFailure = (job, err) => {
    console.info(`withdraw handling failed for: ${job.id} with ${err}. `);
};

const handlerStalled = (job) => {
    console.info(`withdraw handling stalled for: ${job.id}`);
};

module.exports = {
    handlerCompleted,
    handlerFailure,
    handlerStalled,
};
