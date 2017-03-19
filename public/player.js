var role = "player";
var playerNumber;

function onload(){
	startConnection();
	//$("#sent").hide();
	//console.log($("#sent"));
	document.getElementById("sent").style.display = "none";
	var url = window.location.href;
	playerNumber = url.split("#")[1];

	if(playerNumber == "undefined"){
		$("#pick").show();
	}else{
		document.getElementById("playerNumber").innerHTML =playerNumber;
	}
	
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