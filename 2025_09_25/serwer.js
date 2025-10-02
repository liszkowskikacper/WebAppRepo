let http = require('http');
let fs = require('fs/promises');
http.createServer(async (req, res)=> {
    let path = req.url;
    switch(path){
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end("Strona główna");
            break;
        case "/jason":
            let jason = {Grade: "Jedynka", Mood: "Sad"}
            let tekst = JSON.stringify(jason);
            res.end(tekst);
            break;
        case "/plik":
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            const file = await fs.readFile('plik.html', 'utf8')
            res.end(file.toString())
            break
        case "/html":
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end("<h1>hello</h1><h6>WORLD</h6>")
            break;
        default:
            res.status = 404
            res.end('Error: Not Found!')
    }
}).listen(8080);

