const express = require('express');
const http = require('http');

const port=process.env.PORT || 3000;

const app=express();
const server = http.createServer( app);
const io = require('socket.io')(server);



app.use(express.static("public"));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html' )
})

app.get('/home',(req,res)=>{
    res.send("hello");
});

let connectedpeers = [];

io.on('connection',(socket)=>{
    connectedpeers.push(socket.id);
    console.log(connectedpeers);

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        const newconnectedpeers = connectedpeers.filter((peerSocketId)=>{
            peerSocketId !== socket.id;
        });
        connectedpeers= newconnectedpeers;
        console.log(connectedpeers);
    });
});

server.listen(port , ()=>{
    console.log(`listening on ${port}`)
});