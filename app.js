/*eslint-env node*/


var cfenv = require( 'cfenv' );  
var express = require( 'express' );  
var http = require( 'http' );  
var ws = require( 'ws' );
var clients = [];
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

var theHost;
var players = [];
// Listeners
sockets.on( 'connection', function( client ) {  
  // Debug
  console.log( 'Connection.' );
  clients.push(client);
  console.log("------------------clients------------------------");
  //console.log(clients);
  console.log("------------------clients[0]------------------------");
  console.log(clients[0]);
  // Echo messages to all clients
  client.on( 'message', function( message ) {
	console.log(message);
	console.log("sockets: ");
	var data = JSON.parse( message.data );
	var content = data.content;
	//client.send(message);
	//console.log(sockets.clients);
	console.log("----------------------------------");

	if(content=="iHost"){
		theHost = client;
		theHost.send('{"content":"You are host"}');
	}
	if(content=="iPlayer"){
		players.push(client);
		client.send('{"content":"You are player: '+ players.length+'"}');
	}
    for( var i = 0; i < clients.length; i++ ) {	
       clients[i].send( message );   
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