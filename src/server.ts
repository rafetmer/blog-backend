import express from 'express';

const server = express();
const port = 3000;

server.use(express.json());


server.get('/', (req, res) => {
    res.send('API server çalışıyor');
})


server.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde calısıyor`)
});
