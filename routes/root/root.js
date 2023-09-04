const express = require('express')
const router = express.Router()
const path = require('path')

//JQuery API for Node JS
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window } = new JSDOM()
const { document } = (new JSDOM('')).window
global.document = document
var $ = jQuery = require('jquery')(window)

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'views', 'index.html'))
})

module.exports = router