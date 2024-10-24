const cluster = require('cluster');
const os = require('os');
const path = require('path');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running on PID: ${process.pid}`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    require('./server');
    console.log(`Worker process started on PID: ${process.pid}`);
}