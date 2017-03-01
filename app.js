/*eslint-env node*/



 var WebSocketServer = require('ws').Server;
 
 var port = (process.env.VCAP_APP_PORT || 8888); 
 
 wss = new WebSocketServer({port: port});
 wss.on('connection', function(ws) {
     ws.on('message', function(message) {
         console.log('received: %s', message);
         ws.send('echo: ' + message);
     });
     ws.send('connected');
 });
















//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
/*
// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
*/