const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require('body-parser');
const cors = require("cors");
const ip   = require('ip')
let hello =0;
const socketIo = require("socket.io");
console.log(ip.address())
const io = socketIo(server, {
     cors: {
         origin: '*',
         }
        })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
    });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get('/message', (req, res) => {
    console.log('server default res');
    res.json({ message: "Hello from server!" });
});

app.post('/time', (req, res) => {
    hello = req.body
    console.log(req.body);
    res.json({ vitesse: "hello"});
});

app.get('/affichage', (req, res) => {
    console.log('ok');
    res.send(hello);
});

server.listen(8000, '172.20.10.2', () => {
    console.log('run in 8000');
});

io.on('connection', (socket) => {
    console.log('user co ' + socket.id);
    socket.on('msg', (msg)=>{
        console.log(msg)
        msg = socket.id + " : " + msg
        io.emit('msg',msg)
    })

    socket.on('disconnect', () => {
        console.log('user disco');
     });
    });