const fs = require('fs')
const express = require('express')
const app = express()

const port = 3000

const html = require('./getHtml.js')

app.get('/', function (req, res) {
  res.send(html)
})

app.use(express.static('src'))

app.listen(port, () => console.log(`Running on http://localhost:${port}/!`))
