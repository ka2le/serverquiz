var role = "player";
var playerNumber;

function onload(){
	startConnection();
	playerNumber = url.split("#")[1];
	
}


function handleInput(data){
	console.log(" handleInput(data)");
	console.log(data);
	var intent = data.intent;
	if(intent=="newQ"){
		$(".answerButton").each(function() {
		$( this ).show();
	});	
	}
	
}

function answer(theAnswer){
	$(".answerButton").each(function() {
		$( this ).hide();
	});	
	send("answer", theAnswer);
}