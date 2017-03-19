var role = "host";
var playerNumber = 0;

var scoreBoard = [0, 0];
var currentRound = [0,0];
var  currentQuestion = 0;
var theQuestions = [["the question","answerA","answerB","answerC correct","answerD","3"], ["the question2","answerA2 correct","answerB2","answerC2","answerD2","1"]];
var answers = [];
var hasAnswered = 0;
function onload(){
	startConnection();
	//console.log(theQuestions[currentQuestion][0]);
	showNextQ();
}


function handleInput(data){
	console.log(" handleInput(data)");
	var intent = data.intent;
	if(intent == "answer"){
		var player = data.playerNumber;
		var playerAnswer = data.value;
		var correctAnswer = theQuestions[currentQuestion][5];
		if (correctAnswer == playerAnswer){
			currentRound[player-1]++;
		}
		hasAnswered ++;
		if(hasAnswered>1){
			newRound();
		}
	}
	console.log(data);
	
}
function newRound(){
	showNextQ();
	scoreBoard[0] +=  currentRound[0];
	scoreBoard[1] +=  currentRound[1];
	updateScore();
	currentQuestion++;
	currentRound = [0,0]
	hasAnswered = 0;
	send("newQ");	

}
function updateScore(){
	document.getElementById("scorePlayer1").innerHTML = scoreBoard[0];
	document.getElementById("scorePlayer2").innerHTML = scoreBoard[1];
	
}


function showNextQ(){
	document.getElementById("theQuestion").innerHTML = theQuestions[currentQuestion][0];
	for(var i= 1; i<5; i++){
		document.getElementById("A"+i).innerHTML = theQuestions[currentQuestion][i];
	}
	
	
}

