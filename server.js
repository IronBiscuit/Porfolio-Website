//Basic Express Require Statements
const express = require('express')
const app = express()
const { logger } = require('./middleware/logger')
const path = require('path')
const PORT = process.env.PORT || 3500

//Allows the use of our logging middleware
app.use(logger)

//Allows website to receive JSON Data
app.use(express.json())

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))