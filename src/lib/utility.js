const kue = require('kue');
const events = require("./events");
const queue = kue.createQueue();

function createJob(jobType, count) {
    while (count > 0) {
        count--;
        const job = queue.create(jobType, {
            id: Math.random(),
            weight: 'very heavy data'
        }).removeOnComplete(true).on(events.start, (typeOfJobStarted) => {
            console.log(`job started. type of job started: `, typeOfJobStarted);
        }).on(events.progress, (progress, data) => {
            console.log('progress received for job %d. progress value: %d and data is %s', job.data.id, progress, JSON.stringify(data));
        }).on(events.complete, (result) => {
            console.log(`job completed. result: `, result);
        }).on(events.failed, (errMessage) => {
            console.log(`job ${job.data.id} failed with message: ${errMessage}`);
        }).ttl(60 * 1000).save();
    }
}

function cleanJobs() {
    kue.Job.rangeByState('failed', 0, 10, 'asc', (err, jobs) => {
        console.log('total failed jobs: ', jobs?.length);
        if (jobs !== null) {
            jobs.forEach(job => {
                console.log(`job ${job} want to remove`);
                job.remove();
            });
        }
    });
}

function processQueue(jobType, worker) {
    queue.process(jobType, (job, done) => {
        worker(job, done);
    })
}

module.exports = {
    createJob,
    cleanJobs,
    processQueue
};
