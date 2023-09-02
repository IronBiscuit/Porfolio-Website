//Basic Express Require Statements
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

//3rd-party imports
const cookieParser = require('cookie-parser')
const corsHandler = require('cors')

//Imports from local files
const { logger } = require('./middleware/logger')
const errorHandler  = require('./middleware/errorHandler')
const corsOpts = require('./config/corsOptions')

//Allows the use of our logging middleware
app.use(logger)

//Allows website to receive and use JSON Data
app.use(express.json())

//Allows us to parse cookies that our website may receive
app.use(cookieParser())

//Allows us to manage pre-flight requests
app.use(corsHandler(corsOpts))

//Allows website to find the public folder
app.use('/', express.static(path.join(__dirname, 'public')))

//Finds the .js file for Index
app.use('/', require('./routes/root'))

//Default routing for 404 errors
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//Allows the use of our error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))