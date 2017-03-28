var role = "host";
var playerNumber = 0;

var scoreBoard = [0, 0];
var currentRound = [0,0];
var  currentQuestion = 0;
var sound = true;
//Music Questions
var theQuestions = [
["Which of these songs was released first?",
"Tik Tok - Kesha",
"Thrift Shop - Macklemore",
"Bad Day - Daniel Powter",
"Somebody That I Used to Know - Gotye",
"3"], 
["In the song Imagine by John Lennon he tells us to imagine a world without this:",
"Money",
"First World",
"Third World",
"Possessions",
"4"], 
["All these artist/bands are on the Billboard Top 10 of All-Time List. But who is number 1?",
"The Beatles",
"Michael Jackson",
"Elvis Presley",
"Madonna",
"1"],
["Which of these four songs is NOT a song with Bruno Mars?",
"Billionaire",
"Grenade",
"That Way",
"Uptown Funk",
"3"],
["The artist with most views in total on Youtube is Justin Beiber. But how many views does he have?",
"14 670 000 000",
"8 360 000 000",
"3 450 000 000",
"938 000 000",
"1"],  
["Respect by Aretha Franklin is a classic. Finish the lyrics: R-E-S-P-E-C-T ...",
"Do not let them get to me",
"Find out what it means to me",
"You should really let me be",
"I am getting you to see",
"2"],   
["Well Played","Goodbye","Player 1","And","Player 2","3"]];
/*Other questions


var theQuestions = [
["In South Dakota it's illegal to fall down and sleep where?",
"In A Cheese Factory",
"In School",
"In Any Park",
"In Your Own Bathtub",
"1"], 
["The Average American does what 22 times a day?",
"Yawn",
"Open Facebook",
"Fart",
"Opens Fridge",
"4"], 
["the question",
"answerA",
"answerB",
"answerC correct",
"answerD",
"3"], 
["the question2","answerA2 correct","answerB2","answerC2","answerD2","1"]];*/
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
function testNewRound(){
	currentRound[0] = 1;
	currentRound[1] = 0; 
	newRound();
}
function newRound(){
	scoreBoard[0] +=  currentRound[0];
	scoreBoard[1] +=  currentRound[1];
	updateScore();
	setTimeout(newRoundPart2 , 4000);
}
function newRoundPart2(){
	currentQuestion++;
	if(currentQuestion>theQuestions.length){
		currentQuestion = 0;
	}
	currentRound = [0,0]
	hasAnswered = 0;
	send("newQ");	
	showNextQ();
}
function updateScore(){
	document.getElementById("scorePlayer1").innerHTML = "Score Player1: "+scoreBoard[0];
	send("score", 1, currentRound[0]);
	document.getElementById("scorePlayer2").innerHTML = "Score Player2: "+scoreBoard[1];
	send("score", 2, currentRound[1]);
	if(currentRound[0] == 1 && currentRound[1] == 1){
		document.getElementById("theQuestion").innerHTML = "Well Done Both Of You!"
		playSound("welldone");
	}
	if(currentRound[0] == 0 && currentRound[1] == 0){
		document.getElementById("theQuestion").innerHTML = "Better luck next time!"
		playSound("betterluck");
	}
	if(currentRound[0] == 1 && currentRound[1] == 0){
		document.getElementById("theQuestion").innerHTML = "Congratulations to Player 1"
		playSound("congratsp1");
	}
	if(currentRound[0] == 0 && currentRound[1] == 1){
		document.getElementById("theQuestion").innerHTML = "Congratulations to Player 2"
		playSound("congratsp2");
	}
	for(var i= 1; i<5; i++){
		document.getElementById("A"+i).innerHTML = " ";
	}
	if(currentRound[0] == 1){
		document.getElementById("A1").innerHTML = "Player 1 was Right";
	}else{
		document.getElementById("A1").innerHTML = "Player 1 was Wrong";
	}
	if(currentRound[1] == 1){
		document.getElementById("A2").innerHTML = "Player 2 was Right";
	}else{
		document.getElementById("A2").innerHTML = "Player 2 was Wrong";
	}
	
	
}
function playSound(filename){
	if(sound){
		var audio = new Audio("sounds/"+filename+".ogg");
		audio.play();
	}
}
function toggelSound(){
	if(sound){
		$("#nosoundImg").show();
		sound = false;
	}else{
		$("#nosoundImg").hide();
		sound = true;
		
	}
}

function showNextQ(){
	document.getElementById("theQuestion").innerHTML = theQuestions[currentQuestion][0];
	playSound("q"+currentQuestion);
	var ABCD = ['A','B','C','D']
	for(var i= 1; i<5; i++){
		document.getElementById("A"+i).innerHTML = ABCD[i-1]+": "+theQuestions[currentQuestion][i];
	}
	
	
}

