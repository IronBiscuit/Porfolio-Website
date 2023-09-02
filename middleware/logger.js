const { format } = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

//Custom event logger function
const eventLogger = async(msg, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`

    //Try block checks if logs folder exists, if not create it
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }

        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.log(err)
    }
}

//Actual logger
const logger = (req, res, next) => {
    eventLogger(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.path} ${req.method}`)
    next()
}

module.exports = {logger, eventLogger}