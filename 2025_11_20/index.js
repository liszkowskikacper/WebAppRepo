const express = require('express');
const bodyParser = require('body-parser');

const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(bodyParser.json());
const prisma = new PrismaClient();


app.post('/wpis', async (req, res) => {
    const {name, content, author, idKategorii} = req.body;
    const nowy = await prisma.wpis.create({
        name,
        content,
        author,
        idKategorii,
    }
    )
    res.json(nowy);
})

app.get('/wpis', async (req, res) => {
    const wpisy = await prisma.wpis.findMany()
    res.json(wpisy);
})

app.put('/wpis/:id', async (req, res) => {
    const {id} = req.params;
    const {name, content, author, idKategorii} = req.body;
    const nowy = await prisma.wpis.update({
        where: { id: Number(id) },
        data: { name, content, author, idKategorii },
        include: { kategoria: true, komentarz: true }
    })
    res.json(nowy);
})

app.delete('/wpis/:id', async (req, res) => {
    const {id} = req.params;
    const usun = await prisma.wpis.delete({
        where: { id: Number(id) },
    })
    res.json(usun);
})

app.get('/kategoria', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany()
    res.json(kategorie);
})

app.post('/kategoria', async (req, res) => {
    const {name, Wpis} = req.body;
    const nowy = await prisma.kategoria.create({
            name,
            Wpis
        }
    )
    res.json(nowy);
})

app.put('/kategoria/:id', async (req, res) => {
    const {id} = req.params;
    const {name, Wpis} = req.body;
    const nowy = await prisma.kategoria.update({
        where: { id: Number(id) },
        data: { name, Wpis},
    })
    res.json(nowy);
})

app.delete('/kategoria/:id', async (req, res) => {
    const {id} = req.params;
    const usun = await prisma.kategoria.delete({
        where: { id: Number(id) },
    })
    res.json(usun);
})

app.post('/komentarz', async (req, res) => {
    const {content, Wpis} = req.body;
    const nowy = await prisma.komentarz.create({
            content,
            Wpis
        }
    )
    res.json(nowy);
})

app.put('/komentarz/:id', async (req, res) => {
    const {id} = req.params;
    const {content, Wpis} = req.body;
    const nowy = await prisma.komentarz.update({
        where: { id: Number(id) },
        data: { content, Wpis},
    })
    res.json(nowy);
})

app.get('/komentarz', async (req, res) => {
    const komy = await prisma.komentarz.findMany()
    res.json(komy);
})

app.delete('/komentarz/:id', async (req, res) => {
    const {id} = req.params;
    const usun = await prisma.komentarz.delete({
        where: { id: Number(id) },
    })
    res.json(usun);
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
