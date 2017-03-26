var role = "player";
var playerNumber;

function onload(){
	startConnection();
	//$("#sent").hide();
	//console.log($("#sent"));
	document.getElementById("sent").style.display = "none";
	document.getElementById("result").style.display = "none";
	var url = window.location.href;
	playerNumber = url.split("#")[1];

	if(playerNumber == "undefined"){
		$("#pick").show();
	}else{
		document.getElementById("playerNumber").innerHTML =playerNumber;
	}
	
}
function testFunction(){
	var message = {
      intent: "score",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}
function testFunction2(){
	var message = {
      intent: "newQ",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: playerNumber
    };
	handleInput(message);
}

function handleInput(data){
	console.log(" handleInput(data)");
	console.log(data);
	var intent = data.intent;
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