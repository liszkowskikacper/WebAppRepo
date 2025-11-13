const express = require('express')
const app = express();
const fs = require('fs/promises');
const port = 3000;
const path = require("node:path");
app.use(express.static('static'))
const mysql = require('mysql')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'formularz'
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'glowna.html'));
})

app.get('/kontakt.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'kontakt.html'));
})

app.get('/o_nas.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'o_nas.html'));
})

app.get('/oferta.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'oferta.html'));
})


app.post('/kontakt', (req, res) => {
  console.log(req.body.imie);
  console.log(req.body.nazwisko);
  console.log(req.body.email);
  console.log(req.body.message);
  res.redirect('/');
  connection.connect()
  var val1 = req.body.imie;
  var val2 = req.body.nazwisko;
  var val3 = req.body.email;
  var val4 = req.body.message;
  var query = `INSERT INTO messages (Imię, Nazwisko, Email, Tekst) VALUES ('${val1}', '${val2}', '${val3}', '${val4}');`;
  connection.query(query);
  connection.end;


})

app.get('/api/contact-messages', (req, res) => {
  const query = 'SELECT * FROM messages;';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania danych:', err);
      res.status(500).send('Błąd serwera');
      return;
    }
    res.json(results);
  });
})


app.get('/api/contact-messages/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM messages WHERE id = ${id};`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania danych:', err);
      res.status(500).send('Błąd serwera');
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID' });
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(port, () => {
  console.log('Aplikacja działa na http://localhost:3000')
})
