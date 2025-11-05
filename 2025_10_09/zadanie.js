let http = require('http');
const url = require('url');
let fs = require('fs/promises');
const mime = require('mime-types');
const pathModule = require('path');

http.createServer(async (req, res) => {
    let path = req.url;
    switch (path) {
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Strona główna");
            break;

        case "/jason":
            let jason = { Grade: "Jedynka", Mood: "Sad" };
            let tekst = JSON.stringify(jason);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(tekst);
            break;

        case "/plik":
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            const file = await fs.readFile('plik.html', 'utf8');
            res.end(file.toString());
            break;

        case "/html":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>hello</h1><h6>WORLD</h6>");
            break;

        case "/get_params":
            const parsedUrl = url.parse(req.url, true);
            if (parsedUrl.pathname === '/get_params' && req.method === 'GET') {
                console.log('Odebrane parametry GET:', parsedUrl.query);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Parametry zostały odebrane. Sprawdź konsolę.');
            }
            break;

        default:
            try {
                const filePath = pathModule.join(__dirname, 'assets', path);
                const fileData = await fs.readFile(filePath);
                const mimeType = mime.lookup(filePath) || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': mimeType });
                res.end(fileData);
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "404 Not Found", message: "Plik nie istnieje" }));
            }
    }
}).listen(8080);

console.log("Serwer działa na http://localhost:8080");
