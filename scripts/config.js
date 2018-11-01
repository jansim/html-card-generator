const path = require('path')

const SRC_DIR = path.join(__dirname, '../src/')
const SRC_DATA = path.join(SRC_DIR, 'data.json')
const SRC_HTML = path.join(SRC_DIR, 'index.html')

const DIST_DIR = path.join(__dirname, '../dist/')
const DIST_PDF = path.join(DIST_DIR, 'cards.pdf')
const DIST_PDF_COMBINED = path.join(DIST_DIR, 'combined.pdf')

module.exports = {
  SRC_DIR,
  SRC_HTML,
  SRC_DATA,
  DIST_DIR,
  DIST_PDF,
  DIST_PDF_COMBINED
}
