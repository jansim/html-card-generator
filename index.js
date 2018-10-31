const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const pdf = require('html-pdf')

const userOptions = require('./src/options.json')
const data = require('./src/data.json')

const TARGET_DIR = './src/'
const TARGET_FILE = TARGET_DIR + 'index.html'

let rawHtml = fs.readFileSync(TARGET_FILE, 'utf8')

let html =  handlebars.compile(rawHtml)(data)

let options = {
  "base": "file:///" + path.join(__dirname, TARGET_DIR),
  ...userOptions
}

console.log("Options:", options)

pdf.create(html, options).toFile('./dist/out.pdf', function(err, res) {
  if (err) return console.log(err)
  console.log(res)
})
