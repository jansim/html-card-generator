const path = require('path')
const pdf = require('html-pdf')

const html = require('./getHtml.js')
const config = require('./config.js')
const userOptions = require('./src/options.json')

let options = {
  "base": "file:///" + path.join(__dirname, config.TARGET_DIR),
  ...userOptions
}

console.log("Options:", options)

pdf.create(html, options).toFile('./dist/out.pdf', function(err, res) {
  if (err) return console.log(err)
  console.log(res)
})
