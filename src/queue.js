/**
 * In this sample we view inside queue on job objects.
 */

const kue = require('kue');
const queue = kue.createQueue();
const myJobType = 'myJobType';

/**
 * will return something like below
 * queue Queue {
  name: 'kue',
  id: 'kue:cnpr:72237',
  _options: { prefix: 'q', redis: {} },
  promoter: null,
  workers: [],
  shuttingDown: false,
  client: RedisClient {
    _events: [Object: null prototype] {
      newListener: [Function (anonymous)],
      error: [Function (anonymous)]
    },

 */
//console.log(`queue`, queue);


const job = queue.create(myJobType, {id: Math.random(), firstName: 'my fist name'});

/**
 * will return something like below
 * job Job {
  type: 'myJobType',
  data: { id: 0.20434008992564667, firstName: 'my fist name' },
  _max_attempts: 1,
  _jobEvents: true,
  client: RedisClient {
    _events: [Object: null prototype] {
      newListener: [Function (anonymous)],
      error: [Function (anonymous)]
    },

 */
//console.log(`job`, job);

/**
 * While job.save were not called, no job will add to queue. so total will equal to 0.
 */
queue.inactiveCount(myJobType, (err, total) =>{
    console.log('total inactive jobs in queue', total);
})

/**
 * calling job.save() will add created job to queue.
 */
job.save();


/**
 * after saving job to queue, the queue length will increase. and job enqueue will fire
 */
queue.on('job enqueue', (id, type) => {
    console.log(`new job was added to queue. job id: ${id}, job type: ${type}`);

    /**
     * to ensure added job is the created job in current app bootstrap, we get the job data with it's id.
     */
    kue.Job.get(id, (err, job)=> {
        if (err) return;
        console.log('added job is:', job.data.id);
    })
});
