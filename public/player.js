var role = "player";
var playerNumber;
var joining;
var joinNumber;
function onload(){
	startConnection();
	//$("#sent").hide();
	//console.log($("#sent"));
	document.getElementById("sent").style.display = "none";
	document.getElementById("result").style.display = "none";
	var url = window.location.href;
	playerNumber = url.split("#")[1];
	console.log(playerNumber);
	if(playerNumber == null){
		//$("#pick").show();
		document.getElementById("playerNumber").innerHTML = ("Pick Player Number");
		$(".bottomSquares").hide();
		$("#option1").attr('value', '1');
		$("#option1").attr('onclick', 'login(1)');
		$("#option2").attr('value', '2');
		$("#option2").attr('onclick', 'login(2)');
	}else{
		document.getElementById("playerNumber").innerHTML = ("Player: "+playerNumber);
		iAmReady();
	}
	
}
function iAmReady(){
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
	$("#option1").show();
	$("#option2").show();
	$(".bottomSquares").show();
	$("#option1").attr('value', 'A');
	$("#option1").attr('onclick', 'answer(1)');
	$("#option2").attr('value', 'B');
	$("#option2").attr('onclick', 'answer(2)');
	iAmReady();
}

function handleInput(data){
	console.log(" handleInput(data)");
	console.log(data);
	var intent = data.intent;
	if(joining){
		if(intent=="loginTaken"){
			$("#option"+joinNumber).hide();
			document.getElementById("playerNumber").innerHTML = ("Player " + joinNumber + " is Taken. ");
		}
		if(intent=="loginFree"){
			completLogin();
		}
	}else{
		if(intent=="loginas"){
			var theNumber = data.value;
			if(theNumber==playerNumber){
				send("loginTaken");
			}else{
				send("loginFree");
			}
		}
	}	
	if(intent=="newQ"){
		$(".answerButton").each(function() {
			$( this ).show();
		});	
		document.getElementById("sent").style.display = "none";
		document.getElementById("result").style.display = "none";
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
	$(".answerButton").each(function() {
		$( this ).hide();
	});	
	//$( "#sent" ).show();
	document.getElementById("sent").style.display = "block";
	send("answer", theAnswer);
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