var role = "host";
var playerNumber = 0;

var scoreBoard = [0, 0];
var currentRound = [0,0];
var  currentQuestion = 0;
var theQuestions = [["the question","answerA","answerB","answerC","answerD","C"], ["the question2","answerA2","answerB2","answerC2","answerD2","B"]];

function onload(){
	startConnection();
}


