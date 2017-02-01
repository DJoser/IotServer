//------------------------------------------------------------------------------
// node.js IotServer
//------------------------------------------------------------------------------

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
// create a new express server
var app = express();


// Express server
var http = require('http').Server(app);

// Socket events User
var userSocket = require('socket.io')(http);
userSocket.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        socket.emit('chat message', msg);
    });
    socket.on('updateDevices',function (room) {
        socket.emit('devices',['Foco1','Foco2']);
    });
});


// User webpage
app.get('/', function(req, res){
    res.sendfile('index.html');
});
http.listen(appEnv.port, '0.0.0.0', function(){
    console.log('server listening user on '+ appEnv.url);
});