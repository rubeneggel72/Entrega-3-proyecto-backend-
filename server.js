
const http = require( "http" );
const express=require('express');
const logger = require('./utils/logger');
require('dotenv').config()
const app = express()
const server = http.Server(app)
const worker=require('./worker')
const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, async () => {
    logger.info(`Server in port ${srv.address().port} en mode ${process.env.MODE}`)
    console.log(`Server in port ${srv.address().port} en mode ${process.env.MODE}`)
    try {
        worker(app,server)
    }
    catch(error) {
        logger.error(`Error: ${error}`)
    }
})
srv.on("error", error =>{ 
    console.log(`Error en servidor ${error}`)
    logger.error(`Error en servidor ${error}`)
})

