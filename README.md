# User Task Queue System

This project implements a Node.js-based task queuing system with rate limiting using the Express framework and clustering with the Node.js `cluster` module. The goal is to handle multiple user requests efficiently by queuing tasks and enforcing rate limits.

## Project Structure
user-task-queue/ ├── index.js // Entry point for the server and clustering ├── taskManager.js // Manages rate limiting and task queuing ├── logger.js // Logging utility └── logs/ // Directory to store log files


## Prerequisites

1. **Node.js** (v14.0.0 or later) - Download and install from [nodejs.org](https://nodejs.org/).
2. **Git** (optional) - For version control.
3. **Text Editor** (e.g., Visual Studio Code) for editing the files.

## Installation

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd user-task-queue

Step 2: Create Required Files and Directories
If not cloned, create the necessary directories and files:
mkdir logs
touch index.js taskManager.js logger.js


Step 3: Install Dependencies
Initialize the project and install the required packages:

npm init -y
npm install express winston cluster os


Configuration
You can modify settings such as the port number and log file location in the respective files (index.js, taskManager.js, and logger.js).


Usage
 1.Start the Server
 node index.js

2.Sen Requests to the API:
 Use curl or Postman to send a POST request:
 curl -X POST http://localhost:3000/task -H "Content-Type: application/json" -d '{"user_id": "123"}'


Testing
  1. Rate Limiting: Test by sending more than 20 tasks within a minute for a specific user_id.
  2. Task Queue: Send multiple tasks for the same user to see how they are processed in order
  3. Logging: Check the logs/task.log file for task completion logs

  Troubleshooting
   1. EADDRINUSE Error: Ensure no other processes are using port 3000.
   2. Rate Limit Exceeded: Confirm that the rate limits are set correctly.

   