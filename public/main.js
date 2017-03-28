var socket = null;

function startConnection(){
	// WebSocket
	socket = new WebSocket( 'wss://' + window.location.host );  
	socket.addEventListener( 'message', doSocketMessage );
	socket.onopen = function () {
		  console.log("Connected");
		  continueOnload();
	};
}

function send(intent, value, value2){
	
	var message = {
      intent: intent,
	  value: value,
	  value2: value2,
	  sender: role,
	  playerNumber: playerNumber
    };
	socket.send( JSON.stringify( message ) );	 

}


function doSocketMessage( message ) {  
  console.log("doSocketMessage");
  // Parse
  var data = JSON.parse( message.data );
  var intent = data.intent;
  //console.log(intent);
  handleInput(data);
}

function playSound(){
	var audio = new Audio('hello_world.mp3');
	audio.play();

}
function playSound2(){
	var audio = new Audio('sorry.ogg');
	audio.play();

}
function arrayTest(){
	var theArray = [3,4,5];
	console.log(theArray);
	theArray.splice(1, 1);
	console.log(theArray);
}
/*
var container;
var iAm;
function onload(){
	// Input
	input = document.querySelector( 'input[type=\'text\']' );  
	input.addEventListener( 'keypress', doInputKey );    

	// WebSocket
	socket = new WebSocket( 'wss://' + window.location.host );  
	socket.addEventListener( 'message', doSocketMessage );
	container = document.getElementById("container");
	var url = window.location.href;
	var type= url.split("#")[1];
	var test = '{"content":"iHost"}';
	
	console.log(type);
	$(".container").each(function() {
			$( this ).hide();
		});
	
	if(type == null){
		$("#pick").show();
		send("startPlayer");	
	}else{
		if(type=="host"){
			$("#host").show();
			iAm = "host";
			nextQ();
		}else{
			
			var value = type.split("=")[1];
			if(value == 1){
				startPlayer(1);
			}
			if(value == 2){
				startPlayer(2);
			}
		}
		
	}
	if(type == "old"){
		$("#container").show();
	}
	
}

// Keyboard
function doInputKey( event ) {  
  var message = null;
console.log("doInputKey");
  if( event.keyCode == 13 && this.value.trim().length > 0 ) {
		console.log("Enter");
    message = {
      content: this.value.trim(),
    };

    // Send message
    socket.send( JSON.stringify( message ) );  
  }     
}

// Message
function doSocketMessage( message ) {  
  console.log("doSocketMessage");
  // Parse
  var data = JSON.parse( message.data );
  var text = data.content;
  console.log(text);
  var contentArray = text.split("#");
  var intent = text.split("#")[0];
 // if(iAm == "player1" || iAm == "player2"){  }
 
 //before login
  if(intent == "hidePlayer"){
	var value = text.split("#")[1];
	if(value == 1){
		$("#playerbutton1").hide();
	}
	if(value == 2){
		$("#playerbutton2").hide();
	}
  }
  
  //player code
  
  
  //host code
  if(intent == "nextQ"){
	nextQ();
  } 
  if(intent == "playerAnswer"){
	var thePlayer = contentArray[1];
	var theAnswer = contentArray[2];
	var correctAnswer = theQuestions[currentQuestion][5];
	if(theAnswer==correctAnswer){
		if(thePlayer == "player1"){
			currentRound[0] = 1;
		}
		if(thePlayer == "player2"){
			currentRound[1] = 1;
		}
	}
	hasAnswered++;
	if(hasAnswered ==2){
		//sendTo(theHost, "nextQ");
		currentQuestion++;
		nextQ();
		send("currentQuestion#"+currentQuestion);
		hasAnswered = 0;
		scoreBoard[0] += currentRound[0]; 
		scoreBoard[1] += currentRound[1];
		document.getElementById("scorePlayer1").innerHTML = scoreBoard[0];
		document.getElementById("scorePlayer2").innerHTML = scoreBoard[1];
		currentRound = [0,0];
	}
  }
  
}
function nextQ(){
	document.getElementById("theQuestion").innerHTML = theQuestions[currentQuestion][0];
}
var scoreBoard = [0, 0];
var currentRound = [0,0];
var  currentQuestion = 0;
var theQuestions = [["the question","answerA","answerB","answerC","answerD","C"], ["the question2","answerA2","answerB2","answerC2","answerD2","B"]];
var hasAnswered = 0;


function send(text){
	var message = {
      content: text
    };
	socket.send( JSON.stringify( message ) );	 

}

function startPlayer(number){
	$(".container").each(function() {
		$( this ).hide();
	});	
	$("#player").show();
	if(number == 1){
		send('iPlayer_1');
		iAm = "player1";
		//document.location.href += "#player=1";
		updateUrl("#player=1");
	}
	if(number == 2){
		send('iPlayer_2');
		updateUrl("#player=2");
		iAm = "player2";
	}
	document.getElementById("playerNumber").value = number;
	
}
function updateUrl(addText){
	addText += "#"+iAm;
	window.history.pushState('page2', 'Title', addText);

}*/