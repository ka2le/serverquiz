var role = "player";
var playerNumber;
var joining;
var joinNumber;
var started = false;

function onload(){
	document.getElementById("sent").style.display = "none";
	document.getElementById("result").style.display = "none";
	var url = window.location.href;
	$(".square").click(function() {
		console.log(this);
	});	
	playerNumber = url.split("#")[1];
	console.log(playerNumber);
	startConnection();
	console.log(window.location.host);
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
		console.log("menu");
		if($("#menu").is(":visible")){
			$("#menu").slideUp(200);
		}else{
			$("#menu").slideDown(200);
		}
		
	});
	if(window.location.host=="localhost:4330"){
		continueOnload();
	}
}
function continueOnload(){
	//$("#sent").hide();
	console.log("continueOnload");
	if(playerNumber == null){
		//joining = true;
		//$("#pick").show();
		document.getElementById("playerNumber").innerHTML = ("Pick Player Number");
		$("#option1").show();
		$("#option2").show();
		$(".bottomSquares").hide();
		$("#option1").attr('value', '1');
		$("#option1").attr('onclick', 'login(1)');
		$("#option2").attr('value', '2');
		$("#option2").attr('onclick', 'login(2)');
		send("whoisfree");
	}else{
		document.getElementById("playerNumber").innerHTML = ("Player: "+playerNumber);
		iAmReady();
		waitForOthers();
	}

}
function iAmReady(){
	console.log("iAmReady: " +playerNumber);
	send("iAmReady");
}
function login(tryPlayerNumber){
	console.log("try login as "+tryPlayerNumber)
	joining = true;
	document.getElementById("playerNumber").innerHTML = ("Waiting");
	joinNumber = tryPlayerNumber;
	send("loginas", tryPlayerNumber);
}
function completLogin(){
	console.log("completLogin");
	joining = false;
	playerNumber = joinNumber;
	document.getElementById("playerNumber").innerHTML = ("Player: "+playerNumber);
	window.history.pushState('page2', 'Title', '#'+playerNumber);
	$("#option1").attr('value', 'A');
	$("#option1").attr('onclick', 'answer(1)');
	$("#option2").attr('value', 'B');
	$("#option2").attr('onclick', 'answer(2)');
	iAmReady();
	waitForOthers();
}
function waitForOthers(){
	$(".square").each(function() {
		$( this ).hide();
	});	
	document.getElementById("result").innerHTML = "Waiting for other players";
	document.getElementById("result").style.display = "block";
}
function showOptions(){
	console.log("showOptions");
	$(".square").each(function() {
		$( this ).show();
	});
	$(".answerButton").each(function() {
		$( this ).show();
	});

	$("#option1").show();
	$("#option2").show();
	$(".bottomSquares").show();	
	document.getElementById("sent").style.display = "none";
	document.getElementById("result").style.display = "none";
}
function handleInput(data){
	console.log(" handleInput(data)");
	console.log(data);
	
	var intent = data.intent;
	console.log(intent);
	if(joining){
		if(intent=="loginTaken"){
			$("#option"+joinNumber).hide();
			document.getElementById("playerNumber").innerHTML = ("Player " + joinNumber + " is Taken. ");
		}
		if(intent=="loginFree"){
			completLogin();
		}
	}else{
		/*If players handle player number conflict by themselves:
		if(intent=="loginas"){
			var theNumber = data.value;
			if(theNumber==playerNumber){
				send("loginTaken");
			}else{
				send("loginFree");
			}
		}*/
	}
	//if(playerNumber == null){
	if(intent=="freestatus" && playerNumber == null){
		if(data.value > 0){
			$("#option1").hide();
			document.getElementById("playerNumber").innerHTML = ("Player 1 is Taken. ");
		}
		if(data.value2 > 0){
			$("#option2").hide();
			document.getElementById("playerNumber").innerHTML = ("Player 2 is Taken. ");
		}
	}
	if(intent=="iAmReady" && playerNumber == null){
		var theNumber = data.playerNumber;
			$("#option"+theNumber).hide();
			document.getElementById("playerNumber").innerHTML = ("Player " + theNumber + " is Taken. ");
	}
	if(intent=="relog" && !started){
		var whatToDo = data.value;
		if(whatToDo=="done"){
			document.getElementById("result").innerHTML = "Reconnected";
			document.getElementById("result").style.display = "block";
		}
		if(whatToDo=="newQ"){
			console.log("relog + newQ")
			showOptions();
		}
		started = true;
	}
	if(intent=="hostLoaded" && playerNumber != null){
		started = false;
		document.getElementById("playerNumber").innerHTML = ("Player: "+playerNumber);
		iAmReady();
		$(".square").each(function() {
			$( this ).hide();
		});	
		document.getElementById("result").innerHTML = "Reconnected to host. Waiting...";
		document.getElementById("result").style.display = "block";
	}
	if(intent=="starting" || intent=="newQ" ){
		console.log('intent=="starting" || intent=="newQ"');
		 started = true;
		 showOptions();
	}
	if(intent=="score"){
		var playerScoreNumber = data.value;
		if(playerScoreNumber == playerNumber){
			document.getElementById("sent").style.display = "none";
			var theScore = data.value2;
			var text = ""
			if(theScore== 1){
				text = "Correct!";
			}else{
				text = "Wrong";
			}
			document.getElementById("result").innerHTML = text;
			document.getElementById("result").style.display = "block";
		}
	}
	
}

function answer(theAnswer){
	console.log(" theAnswer: " +theAnswer)
	$(".square").each(function() {
		$( this ).hide();
	});	
	//$( "#sent" ).show();
	document.getElementById("sent").style.display = "block";
	send("answer", theAnswer);
}




//--------------------------------------------Test-------------------------------------
function test(){
	console.log("testFunction");	
	if(window.location.host=="localhost:4330"){
		testStart();
		
	}
	

}

function divFunction(number){

	console.log("divFunction " + number);
}
function testRelog(theValue){
	var message = {
      intent: "relog",
	  value: theValue,
	  value2: 1,
	  sender: "host",
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testStart(){
	var message = {
      intent: "starting",
	  value: 1,
	  value2: 1,
	  sender: "host",
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testNew(){
	var message = {
      intent: "newQ",
	  value: 1,
	  value2: 1,
	  sender: "host",
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testFunction(){
	var message = {
      intent: "loginFree",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testFunction2(){
	var message = {
      intent: "loginTaken",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testCorrect(){
	var message = {
      intent: "score",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: 0
    };
	handleInput(message);
}

function testFunction3(){
	var message = {
      intent: "score",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testFunction4(){
	var message = {
      intent: "newQ",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}