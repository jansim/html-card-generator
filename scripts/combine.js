const hummus = require('hummus')
const config = require('./config')

const SRC_PDF_PATH = config.DIST_PDF
const OUT_PDF_PATH = config.DIST_PDF_COMBINED

var pdfWriter = hummus.createWriter(OUT_PDF_PATH, {version: hummus.ePDFVersion14})

// Convet mm to pts (the internal pdf unit)
let mm2pt = (mm) => mm * 2.83465

// Dimensions of created pages
const PAGE_WIDTH = 842
const PAGE_HEIGHT = 595

// Create a new page and return it
// used for easier sizing of pages
function createNewPage() {
  // A4 (size in pts)
  return pdfWriter.createPage(0, 0, PAGE_WIDTH, PAGE_HEIGHT)
}

let page = createNewPage()

// Read in the src PDF as an array of XObjects
let formIDs = pdfWriter.createFormXObjectsFromPDF(SRC_PDF_PATH, hummus.ePDFPageBoxMediaBox)
console.log(`Reading ${formIDs.length} PDF Pages`)

// Determine all kinds of dimensions for the target template
let docWidth = PAGE_WIDTH
let docHeight = PAGE_HEIGHT
let cardWidth = mm2pt(54)
let cardHeight = mm2pt(85)
let marginX = 37
let marginY = 42
let x = marginX
let y = marginY

// Iretate overall the cards and place them somewhere on the board
// .cm() parameters [For reference]
// (scaleX, trans?, trans?, scaleY, xFromLeft, yFromBot)
formIDs.forEach((ID, index) => {
  // Place card on page
  pdfWriter.startPageContentContext(page)
    .q() // start
    .cm(1, 0, 0, 1, x, y)
    .doXObject(page.getResourcesDictionary().addFormXObjectMapping(ID))
    .Q() //end

  // Increment X position
  x += cardWidth

  // Is the edge of the document reached?
  if ((x + cardWidth + marginX) > docWidth) {
    x = marginX

    if (y === marginY) {
      // in first row => go to 2nd
      y = docHeight - marginY - cardHeight
    } else {
      // already in 2nd row => new page
      pdfWriter.writePage(page) // write current page
      page = createNewPage()

      // reset x and yy
      x = marginX
      y = marginY
    }
  }
})

// Finish writing the started page
pdfWriter.writePage(page)

// End modifying the pdf and save it
pdfWriter.end()
