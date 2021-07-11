const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const server = require('http').Server(app);
const io = require('socket.io')(server);
var cors = require('cors');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('staticfiles'));
const port = process.env.YOUR_PORT || process.env.PORT || 8000;


app.use(express.urlencoded());
//`/${uuid.v4()}`


app.get('/', function(req,res){
  res.redirect('/home');
});



app.get('/home', function(req,res){
  return res.render('homepage');
});

app.get('/newRoom', function(req, res){
    res.redirect(`/${uuid.v4()}`);
});

app.get('/chatroom/new', function(req, res){
    res.redirect(`/chatroom/${uuid.v4()}`);
});

app.get('/chatroom/:room', function(req, res){
  console.log(req.url);
  return res.render('chatroom.ejs', {
      'roomId' : req.params.room

  });
});


app.get('/whiteboard/new', function(req, res){
  res.redirect(`/whiteboard/${uuid.v4()}`);
});

app.get('/whiteboard/:room', function(req, res){
  console.log(req.url);
  return res.render('board.ejs', {
      'roomId' : req.params.room

  });
});




app.get('/callend', function(req, res){
  return res.render('callend');
});


app.get('/:room', function(req,res){
    console.log(req.url);
    return res.render('videocall.ejs', {
        'roomId' : req.params.room

    });
});



app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


io.on('connection', function(socket){
    socket.on('join-room', function(roomId, userId){
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId);

        socket.on("Message", (textmsg, name, senderUserId) => {
          io.to(roomId).emit("newMessage", textmsg, name, senderUserId);
        });

        socket.on('disconnect', ()=>{
          socket.to(roomId).emit('user-disconnected',userId);
        });
        
        socket.on("drawing", function(data, roomId){
          socket.to(roomId).emit("draw-this", data);
        });

        socket.on("clear", function(roomId){
          socket.to(roomId).emit("clear-canvas");
        });
    });
   
});



server.listen(port, function(err){
    if(err){
        console.log('Error is', err);
    }

    console.log('The server is up and running on port', port);
});