//Importing eventLogger from logger.js
const { eventLogger } = require('./logger')

//Basic error handler function
const errorHandler = (err, req, res, next) => {
    
    eventLogger(`${err.name}: ${err.message}\t${req.url}\t${req.method}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500
    res.status(status)

    res.json({ message: err.message})
}

module.exports = errorHandler