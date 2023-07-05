const {createJob, processQueue} = require("./lib/utility");
const jobType = 'queue-progress-tracker';


createJob(jobType, 3);

let progress = 0;
processQueue(jobType, (job, done) => {
    /**
     * iterate on queue and call this function. pass job argument as input to this function.
     * after every job complete, call Done callback to set job state to complete.
     */
    console.log(`start processing job.data.id`, job.data.id);
    //...
    //...
    while (progress < 100){
        job.progress(progress, 150, {progressData: 'result in progress'});
        progress+= 5;
    }
    progress = 0;
    setTimeout(() => {
        done && done(null, `processing job ${job.data.id} completed successfully`);
        //done(new Error('test failed jobs'));
    }, 10)
});
