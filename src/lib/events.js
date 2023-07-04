
/**
 * Job-specific events are fired on the Job instances via Redis pubsub.
 */
const enqueue = 'enqueue';
const start = 'start';
const promotion = 'promotion';
const progress = 'progress';
const failedAttempt = 'failed attempt';
const failed = 'failed';
const complete = 'complete';
const remove = 'remove';

/**
 * Queue-level events provide access to the job-level events previously mentioned, however scoped to the Queue instance to apply logic at a "global" level.
 */
const jobEnqueue = 'job enqueue';
const jobStart = 'job start';
const jobPromotion = 'job promotion';
const jobProgress = 'job progress';
const jobFailedAttempt = 'job failed attempt';
const jobFailed = 'job failed';
const jobComplete = 'job complete';
const jobRemove = 'job remove';

module.exports = {
    enqueue,
    start,
    promotion,
    progress,
    failedAttempt,
    failed,
    complete,
    remove,
    jobEnqueue,
    jobStart,
    jobPromotion,
    jobProgress,
    jobFailedAttempt,
    jobFailed,
    jobComplete,
    jobRemove
}
