const kue = require('kue');
const events = require('./events');

const queue = kue.createQueue();
const jobType = 'job-tracer';

let n = 5;
while (n > 0) {
    n--;
    const job = queue.create(jobType, {id: Math.random(), weight: 'very heavy data'}).save();

    console.log(`job created. job.data.id: `, job.data.id);

    job.on(events.start, (typeOfJobStarted) => {
        console.log(`job started. type of job started: `, typeOfJobStarted);
    });

    job.on(events.complete, (result) => {
        console.log(`job completed. result: `, result);
    });
}

queue.process(jobType, (job, done) => {
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
})
