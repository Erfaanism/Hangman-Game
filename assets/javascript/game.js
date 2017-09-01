var arrFName = ["ARYA", "BRAN", "CATELYN", "CERSEI", "DAENERYS", "JAIME", "JOFFREY", "JON", "SANSA", "TYRION"];
var arrLName = ["STARK", "STARK", "STARK", "LANNISTER", "TARGARYEN", "LANNISTER", "BARATHEON", "SNOW", "STARK", "LANNISTER"];
var arrImage = ["arya.jpg", "bran.jpg", "catelyn.jpg", "cersei.jpg", "daenerys.jpg", "jaime.jpg", "joffrey.jpg", "jon.jpg", "sansa.jpg", "tyrion.jpg"];
var arrGuessedLetters = [];
var arrUsedLetters = [];
var strCpuName = "";
var arrCpuName = [];
var arrCompleteWord = [];
var arrRevealedLetters =[];
var strCpuImage = "";
var intCorrectCounter = 0;
var	intWrong = 0;
var intWrongCounter = 0;
var intIndex = 0;
var intSpaceIndex = 0;
var intRemaining = 0;
var arrUsedLetters = [];
var intCounterW = 0;
var intCounterL = 0;
var bolSpaceRemoved = false;
var bolPlay = false;

function charSelector() {
		var rndm = Math.floor(Math.random() * arrFName.length);
		strCpuName = (arrFName[rndm] + " " + arrLName[rndm]);
		strCpuImage = arrImage[rndm];
		arrCpuName = strCpuName.split("");
};

function currentWord() {
	$("#currentWord").empty();
	$.each(arrCpuName, function(i, letter){
		if (letter !== " ") {
			$("#currentWord").append("<span id='char" + i + "'>_ </span>");
			// arrCompleteWord.push(letter);
		}
		else {
			$("#currentWord").append("<span>&nbsp;&nbsp;</span>");
			arrRevealedLetters[i] = " ";
		}
	})
}

function play() {
	if (bolPlay == false) {
		arrUsedLetters = [];
		charSelector();
		currentWord();
		intRemaining = 6;
		$("#remainingGuesses").html(intRemaining);
		$("guessedLetters").empty();
		$("#wins").html(intCounterW);
		$("#loses").html(intCounterL);
		$("#instructions").css("color", "transparent");
		$("#guessedLetters").html("&nbsp;");
		$("#charImg").attr("src", "assets/images/throne.jpg");
		$("#hangman").attr("src", "assets/images/hang.png");
		bolPlay = true;
	}
}

function wining(){
	$("#instructions").html("You won!<br>Press Enter to restart the Game!").css("color", "#ddd");
	bolPlay = false;
	intCounterW++;
	$("#wins").html(intCounterW);
	$("#charImg").attr("src", "assets/images/" + strCpuImage);
}

function losing() {
	$("#instructions").html("Game Over, Please try again!<br>Press Enter to restart the Game!").css("color", "#ddd");
	bolPlay = false;
	intCounterL++;
	$("#loses").html(intCounterL);
}

function checker(letter) {
	intWrongCounter = 0;
	$.each(arrCpuName, function(i, val) {

		if (letter !== " " && letter.toUpperCase() == val) {
			$("#char" + i).html(letter.toUpperCase() + "&nbsp;");
			arrUsedLetters.push(letter.toUpperCase());
			arrRevealedLetters[i] = letter.toUpperCase();
		}
		else if (letter.toUpperCase() !== " " && letter.toUpperCase() !== $("#char" + i).text()) {
			intWrongCounter++;
			arrUsedLetters.push(letter.toUpperCase());
		}
		
	})

	if ($("#currentWord").text().indexOf("_") < 0) {
		wining();
	}

	if (intWrongCounter == arrCpuName.length) {
		intRemaining--;
		$("#remainingGuesses").html(intRemaining);
		arrGuessedLetters[intIndex] = letter.toUpperCase();
		$("#guessedLetters").append(letter.toUpperCase());
		intIndex++;

		switch (intRemaining) {
			case 5:
			$("#hangman").attr("src", "assets/images/hang1.png");
			break;
			case 4:
			$("#hangman").attr("src", "assets/images/hang2.png");
			break;
			case 3:
			$("#hangman").attr("src", "assets/images/hang3.png");
			break;
			case 2:
			$("#hangman").attr("src", "assets/images/hang4.png");
			break;
			case 1:
			$("#hangman").attr("src", "assets/images/hang5.png");
			break;
			case 0:
			$("#hangman").attr("src", "assets/images/hang6.png");
			break;
		}

		if (intRemaining == 5) {
			$("#hangman").attr("src", "assets/images/hang1.png");
		}
	}

	if (intRemaining == 0) {
		losing();
	}
}

document.onkeyup = function exec(event){
	if (bolPlay == false && event.keyCode == 13) {
		play();
	}
	if (bolPlay == true && event.keyCode >= 65 && event.keyCode <= 90 && !arrUsedLetters.includes(event.key.toUpperCase())) {
	checker(event.key);
	}
}