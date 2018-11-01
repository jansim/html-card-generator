const path = require('path')
const pdf = require('html-pdf')

const html = require('./getHtml.js')
const config = require('./config.js')
const userOptions = require(path.join(config.SRC_DIR, 'options.json'))

let options = {
  "base": "file:///" + config.SRC_DIR,
  ...userOptions
}

console.log("Options:", options)

pdf.create(html, options).toFile(config.DIST_PDF, function(err, res) {
  if (err) return console.log(err)
  console.log(res)
})
