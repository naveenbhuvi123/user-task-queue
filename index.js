const express = require('express');
const cluster = require('cluster');
const os = require('os');

const PORT = 4000; // Ensure this line sets the port to 4000

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route for task handlings
app.post('/task', (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  res.send({ message: `Task for user ${user_id} has been added to the queue.` });
});

// Cluster setup to utilize multiple CPU cores
if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < Math.min(numCPUs, 2); i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, starting a new worker`);
    cluster.fork(); // Start a new worker if one dies
  });
} else {
  // Worker processes should only handle server logic, not port assignment
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, Worker PID: ${process.pid}`);
  });
}
