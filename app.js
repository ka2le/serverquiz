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
var player1 = "";
var player2 = "";

// Listeners
sockets.on( 'connection', function( client ) {  
  // Debug
  console.log( 'Connection.' );
  clients.push(client);
  console.log("------------------clients------------------------");
  //console.log(clients);
  //console.log(clients[0]);
  // Echo messages to all clients
  client.on( 'message', function( message ) {
	console.log(message);
    for( var i = 0; i < clients.length; i++ ) {	
       clients[i].send( message );   
    }
  } );
} );
function sendTo(theClient, text){
	theClient.send('{"content":"'+text+'"}');
}
// Start
server.on( 'request', app );  
server.listen( environment.port, function() {  
  console.log("environment.url");
  console.log( environment.url );
} );



	/*console.log(message);
	//console.log("sockets: ");
	//var data = JSON.parse( message );
	//console.log(data)
	//var content = data.content;
	//client.send(message);
	//console.log(sockets.clients);
	console.log("----------------------------------");
	var theContent = message.split(":")[1];
	theContent = theContent.split('"')[1];
	var contentArray = theContent.split("#");
	var intent = contentArray[0];
	if(intent=="iHost"){
		console.log("iHost")
		theHost = client;
		sendTo(theHost, "youarehost");
		//theHost.send('{"content":"You are host"}');
		//console.log(theHost);
		player1 = "";
		player2 = "";
	}
	
	if(intent=="iPlayer"){	
		players.push(client);
		client.send('{"content":"You are player: '+ players.length+'"}');
	}
	if(intent=="iPlayer_2"){	
		player2 = client;
		client.send('{"content":"youareplayer#2"}');
	}
	if(intent=="iPlayer_1"){	
		player2 = client;
		client.send('{"content":"youareplayer#2"}');
	}
	if(intent=="startPlayer"){
		var hidePlayer = "";
		if(player1 != ""){
			hidePlayer += "1";
		}
		if(player2 != ""){
			hidePlayer += "2";
		}
		//client.send("#playerLeft#1")
		sendTo(client, "hidePlayer#"+hidePlayer);
	}
	if(intent=="answer"){
		var who = contentArray[contentArray.length-1];
		var theAnswer = contentArray[1];
		sendTo(theHost, ("playerAnswer#"+who+"#"+theAnswer));
		
	}*/







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