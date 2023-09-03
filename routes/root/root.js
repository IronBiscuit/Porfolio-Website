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

var typed_strings = $('.typed-text').text()
console.log(typed_strings)

// if ($('.typed-text-output').length == 1) {
//     var typed_strings = $('.typed-text').text();
//     var typed = new Typed('.typed-text-output', {
//         strings: typed_strings.split(', '),
//         typeSpeed: 100,
//         backSpeed: 20,
//         smartBackspace: false,
//         loop: true
//     });
// }

module.exports = router