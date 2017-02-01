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

// User webpage
app.get('/', function(req, res){
    res.sendfile('index.html');
});

var http = require('http').Server(app);
http.listen(appEnv.port, '0.0.0.0', function(){
    console.log('server listening user on '+ appEnv.url);
});