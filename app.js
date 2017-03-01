/*eslint-env node*/


var cfenv = require( 'cfenv' );  
var express = require( 'express' );  
var http = require( 'http' );  
var ws = require( 'ws' );

// Environment
var environment = cfenv.getAppEnv();

// Web
var app = express();

// Static
app.use( '/', express.static( 'public' ) );

// Sockets
var server = http.createServer();  
var sockets = new ws.Server( {  
  server: server
} );
console.log("Started");

// Listeners
sockets.on( 'connection', function( client ) {  
  // Debug
  console.log( 'Connection.' );

  // Echo messages to all clients
  client.on( 'message', function( message ) {
	console.log(message);
	console.log("sockets: ");
	
	console.log(sockets.clients);
	console.log("----------------------------------");
	var theClients = io.sockets.clients();
	var theClients2 = io.sockets.connected();
	console.log(theClients);
	console.log("theClients2:");
	console.log(theClients2);
    for( var c = 0; c < sockets.clients.length; c++ ) {
		console.log(sockets.clients[c]);
      sockets.clients[c].send( message );   
    }
  } );
} );

// Start
server.on( 'request', app );  
server.listen( environment.port, function() {  
  console.log("environment.url");
  console.log( environment.url );
} );











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