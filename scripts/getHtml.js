const fs = require('fs')
const handlebars = require('handlebars')

const config = require('./config.js')
const data = require(config.SRC_DATA)

let rawHtml = fs.readFileSync(config.SRC_HTML, 'utf8')

// --- Handlebars ---
// Repeat content X times (undefined => 1)
// from https://stackoverflow.com/questions/11924452/iterating-over-basic-for-loop-using-handlebars-js
handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    if (n === undefined) { n = 1 }
    for(var i = 0; i < n; ++i) {
      accum += block.fn(this);
    }
    return accum;
})
handlebars.registerHelper('iconNotice', (icon, options) => {
  if (!icon) { return }

  let split = icon.split('/')
  // Show only when icon is in a subfolder and  for icons in "game-icons"
  if (split.length < 3 || split[0] !== 'game-icons') { return }

  return `Icon by ${split[1]}`
})
let html =  handlebars.compile(rawHtml)(data)

module.exports = html
