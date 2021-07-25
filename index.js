
const cluster = require( "cluster" );
const os = require( "os" );
require('dotenv').config();
const logger = require('./utils/logger');

if (process.env.MODE == 'CLUSTER') {

workersQty=process.env.WORKERS_QTY||os.cpus().length
if (os.cpus().length<process.env.WORKERS_QTY)
	{
		logger.warn("Variable WORKERS_QTY=",process.env.WORKERS_QTY, " is bigger than CPUS = ",os.cpus().length)
		workersQty=os.cpus().length
	}
	logger.info("Server start whith ",workersQty," worker process") ;

if ( cluster.isMaster ) {
	logger.info( "[Cluster]  Master process is now running.", process.pid );
	for ( var i = 0, coreCount = workersQty ; i < coreCount ; i++ ) {
		var worker = cluster.fork();
	}

	cluster.on(
		"exit",
		function handleExit( worker, code, signal ) {
			console.log("[Cluster] Worker has died.", worker.process.pid );
			console.log( "[Cluster] Death was suicide:", worker.exitedAfterDisconnect );
			logger.warn("[Cluster] Worker has died.", worker.process.pid );
			logger.warn( "[Cluster] Death was suicide:", worker.exitedAfterDisconnect );
			if ( ! worker.exitedAfterDisconnect ) {
				var worker = cluster.fork();
			}
		}
	);

} else {if (cluster.isWorker)
	{
	require( "./server" );
	console.log( "[Worker] Worker has started.", process.pid )
	logger.info("[Worker] Worker has started.", process.pid) ;
	}
}
}
else{
 
	require( "./server" );

	
}
