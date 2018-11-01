const fs = require('fs')
const handlebars = require('handlebars')

const config = require('./config.js')
const data = require('./src/data.json')

let rawHtml = fs.readFileSync(config.TARGET_FILE, 'utf8')
let html =  handlebars.compile(rawHtml)(data)

module.exports = html
