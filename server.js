const express = require('express');
const http =  require('http');
const socketio = require('socket.io');
const db = require('./dbhandler.js')

const app = express();
const server = http.Server(app);
const io = socketio(server);  //Creates io server on HTTP wala server
//Both hosted on same server


app.use('/',express.static(__dirname + '/public_html'));

app.get('/showChat',function(req,res){

    db.fetchHistory(function(chat){
        res.send(chat);
    })
});

app.get('/clear',function(req,res){

    db.clearHistory();
    res.end();
});

//DIFFERENT 'socket' is created on every call
io.on('connection',function(socket){
   console.log('A user is connected');

    socket.on('chat',function(data){
        console.log(data.msg);

        db.addHistory(data);
        //Can give new name for CHAT here instead of chat.
        //EMIT IS DONE THROUGH IO and NOT SOCKET
        io.emit('chat', data);
    })
});

server.listen(3000,function(){
    console.log("Running on Port 3000");
})