var role = "host";
var playerNumber = 0;
var players = [0,0];
var scoreBoard = [0, 0];
var currentRound = [0,0];
var  currentQuestion = 0;
var sound = true;
var audio = new Audio("sounds/q1.ogg");
var answers = [];
var hasAnswered = 0;
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
["How old was the genius Mozart when he wrote his first piece? ",
"3",
"6",
"4",
"5",
"4"],
["Robyn Fenty is better known by her stagename. What is it?",
"Adele",
"Lady Gaga",
"Beyoncé",
"Rihanna",
"4"],
["Who won Eurovision Song Contest in 2010?",
"Loreen with Euphiroa",
"Lena with Satellite",
"Alexander Rubak with Fairytale",
"Ell & Nikki with Running Scared",
"2"], 
["In what order are the strings set up on a standard tuned guitar?",
"ABCDEF",
"FEDCBA",
"EADGBE",
"EGBDAC",
"3"], 
["Who is the artist with song titles like these?  Beauty and a Beat, Mistletoe and Boyfriend.",
"Taylor Swift",
"Justin Timberlake",
"Justin Bieber",
"Miley Cyrus",
"3"],
["How many strings does a Violin have?",
"4",
"6",
"5",
"3",
"1"],
["What singer, born in London, is really named Miss Adkins?",
"Madonna",
"Adele",
"Lady Gaga",
"Fergie",
"2"]                  
]; //["Well Played","Goodbye","Player 1","And","Player 2","3"]


function onload(){
	startConnection();
	//console.log(theQuestions[currentQuestion][0]);
	//showNextQ();
}
function continueOnload(){
	console.log("continueOnload does nothing now on host.");
}
var playerOneAnswer = 0;
var playerTwoAnswer = 0;
function handleInput(data){
	console.log(" handleInput(data)");
	var intent = data.intent;
	if(intent == "answer"){
		var player = data.playerNumber;
		var playerAnswer = data.value;
		var correctAnswer = theQuestions[currentQuestion][5];
		var point = -1;
		
		if(correctAnswer == playerAnswer){
			point = 1;
		}
		if(player == 1){
			if(playerOneAnswer == 0){
				playerOneAnswer = point;
				currentRound[player-1]=-1;
			}
		}
		if(player == 2){
			if(playerTwoAnswer == 0){
				playerOneAnswer = point;
				currentRound[player-1]=-1;
			}
		}
		if(playerTwoAnswer != 0 && playerOneAnswer != 0){
			newRound();
		}
	}
	if(intent=="loginas"){
			var theNumber = data.value;
			console.log("loginas " +theNumber);
			if(players[theNumber-1]>0){
				send("loginTaken");
			}else{
				send("loginFree");
				players[theNumber-1]+=1;
			}
		}
	if(intent == "iAmReady"){
		var theNumber = data.playerNumber;
		console.log("iAmReady " +theNumber);
		document.getElementById("scorePlayer"+theNumber).innerHTML = "Player 1: <label>Ready!</label>";
		players[theNumber-1]+=2;
		if(players[0]>0 && players[1]>0){
			console.log("everyone ready");
			start();
		}
	}	
	console.log(data);
	
}
function start(){
	showNextQ();
	send("starting");
}

function newRound(){
	//scoreBoard[0] +=  currentRound[0];
	//scoreBoard[1] +=  currentRound[1];
	updateScore();
	setTimeout(newRoundPart2 , 5000);
}
function newRoundPart2(){
	currentQuestion++;
	if(currentQuestion>theQuestions.length){
		currentQuestion = 0;
		playSound("goodbye");
	}else{
		currentRound = [0,0]
		playerOneAnswer = 0;
		playerTwoAnswer = 0;
		hasAnswered = 0;
		$(".square label").css( "color", "black" );
		send("newQ");	
		showNextQ();
	}
	}
	
function updateScore(){
	stopTalking();
	if(currentRound[0] == 1 && currentRound[1] == 1){
		document.getElementById("theQuestion").innerHTML = "Well Done Both Of You!" //Correct answer was: "+correctAnswer +"<br>
		scoreBoard[0] ++;
		scoreBoard[1] ++;
		playSound("welldone");
	}
	if(currentRound[0] < 0 && currentRound[1] < 0){
		document.getElementById("theQuestion").innerHTML = "Better luck next time!"
		playSound("betterluck");
	}
	if(currentRound[0] == 1 && currentRound[1] < 0){
		document.getElementById("theQuestion").innerHTML = "Congratulations to Player 1"
		scoreBoard[0] ++;
		playSound("congratsp1");
	}
	if(currentRound[0] < 0 && currentRound[1] == 1){
		document.getElementById("theQuestion").innerHTML = "Congratulations to Player 2"
		scoreBoard[1] ++;
		playSound("congratsp2");
	}
	var correctAnswer = theQuestions[currentQuestion][5];
	for(var i= 1; i<5; i++){
		if(correctAnswer!=i){
			document.getElementById("A"+i).innerHTML = " ";
		}
	}
	$(".square label").css( "color", "green" );
	document.getElementById("scorePlayer1").innerHTML = "Player 1: <label>"+scoreBoard[0] + " </label> Points ";
	send("score", 1, currentRound[0]);
	document.getElementById("scorePlayer2").innerHTML = "Player 2: <label>"+scoreBoard[1] + " </label> Points ";
	send("score", 2, currentRound[1]);
	
}

function playSound(filename){
	stopTalking();
	if(sound){
		audio = new Audio("sounds/"+filename+".ogg");
		audio.play();
	}
}
function stopTalking(){
	audio.pause();
	audio.currentTime = 0;
}
function toggelSound(){
	if(sound){
		$("#nosoundImg").show();
		sound = false;
		stopTalking();
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


//-------------------------------TEST----------------------------------------------------


function testJoin(){
	var message = {
      intent: "loginas",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: 1
    };
	handleInput(message);
}
function testReady(number){
	var message = {
      intent: "iAmReady",
	  value: 1,
	  value2: 1,
	  sender: role,
	  playerNumber: number
    };
	handleInput(message);
}
function testNewRound(){
	currentRound[0] = 1;
	currentRound[1] = 1; 
	newRound();
}
function testRightAnswer(){
	testNewRound();
}

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

