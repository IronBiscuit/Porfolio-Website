//Import list of allowed origins from allowedOrigins.js
const allowedOrigins = require('./allowedOrigins')

const corsOpts = {
    origin : (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 ) {
            callback(null, true)
        } else {
            callback(new Error('Not permitted by CORS'))
        }

    }, 
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOpts