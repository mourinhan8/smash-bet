const handlerCompleted = (job) => {
    console.info(`indexing event handling id:${job.id} has completed`);
    job.remove();
};

const handlerFailure = (job, err) => {
    console.info(`indexing event handling failed for: ${job.id} with ${err}. `);
};

const handlerStalled = (job) => {
    console.info(`indexing event handling stalled for: ${job.id}`);
};

module.exports = {
    handlerCompleted,
    handlerFailure,
    handlerStalled,
};
