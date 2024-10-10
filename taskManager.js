const logger = require('./logger');

// In-memory queue and rate limiters
const userTaskQueue = new Map();
const rateLimiter = new Map();

// Task processing function
async function task(user_id) {
  const message = `${user_id} - Task completed at ${Date.now()}`;
  console.log(message);
  logger.info(message); // Log to file
}

// Function to process the next task in the queue for a user
function processNextTask(user_id) {
  const queue = userTaskQueue.get(user_id);

  if (queue && queue.length > 0) {
    const nextTask = queue.shift(); // Get the next task from the queue

    // Execute the task and log the result
    task(user_id).then(() => {
      if (queue.length > 0) {
        setTimeout(() => processNextTask(user_id), 1000); // Rate limit of 1 task per second
      } else {
        userTaskQueue.delete(user_id); // Clear the queue if no tasks left
      }
    });
  }
}

// Function to add tasks to the queue
function addTaskToQueue(user_id) {
  if (!userTaskQueue.has(user_id)) {
    userTaskQueue.set(user_id, []); // Create a new queue for the user if not exists
  }

  const queue = userTaskQueue.get(user_id);
  const userLimit = rateLimiter.get(user_id) || { taskCount: 0, startTime: Date.now() };

  // Check if the rate limit is exceeded (20 tasks per minute)
  if (userLimit.taskCount >= 20 && Date.now() - userLimit.startTime < 60000) {
    console.log(`Rate limit exceeded for user ${user_id}. Task will be dropped.`);
    return;
  }

  // Update rate limiter
  if (Date.now() - userLimit.startTime >= 60000) {
    userLimit.taskCount = 0;
    userLimit.startTime = Date.now();
  }

  userLimit.taskCount += 1;
  rateLimiter.set(user_id, userLimit);

  queue.push(user_id); // Add task to the user's queue

  if (queue.length === 1) {
    // Start processing if no other task is in progress
    processNextTask(user_id);
  }
}

module.exports = { addTaskToQueue };
