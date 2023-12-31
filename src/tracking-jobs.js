const {createJob, processQueue} = require("./lib/utility");
const jobType = 'job-tracer';

createJob(jobType, 5);


setTimeout(() => {
    console.log('create a new job after a wild started');
    createJob(jobType);
}, 5 * 1000);

processQueue(jobType, (job, done) => {
    /**
     * iterate on queue and call this function. pass job argument as input to this function.
     * after every job complete, call Done callback to set job state to complete.
     */
    console.log(`start processing job.data.id`, job.data.id);
    //...
    //...
    setTimeout(() => {
        done && done(null, `processing job ${job.data.id} completed successfully`);
    }, 3 * 1000);
});
