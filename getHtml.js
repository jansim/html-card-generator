const fs = require('fs')
const handlebars = require('handlebars')

const config = require('./config.js')
const data = require('./src/data.json')

let rawHtml = fs.readFileSync(config.TARGET_FILE, 'utf8')

handlebars.registerHelper('iconNotice', (icon, options) => {
  if (!icon) { return }

  let split = icon.split('/')
  // Show only when icon is in a subfolder and  for icons in "game-icons"
  if (split.length < 3 || split[0] !== 'game-icons') { return }

  return `Icon by ${split[1]}`
})
let html =  handlebars.compile(rawHtml)(data)

module.exports = html
