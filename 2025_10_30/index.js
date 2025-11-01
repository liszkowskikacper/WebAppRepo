const express = require('express')
const app = express();
const fs = require('fs/promises');
const port = 3000;
const path = require("node:path");
app.use(express.static('static'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'glowna.html'));
})

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'kontakt.html'));
})

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'o_nas.html'));
})

app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'oferta.html'));
})



app.listen(port, () => {
  console.log('Aplikacja działa na http://localhost:3000')
})
