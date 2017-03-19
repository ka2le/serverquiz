var role = "player";
var playerNumber;

function onload(){
	startConnection();
	playerNumber = url.split("#")[1];
	
}


function handleInput(data){
	console.log(" handleInput(data)");
	console.log(data);
	
}