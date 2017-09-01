var arrFName = ["ARYA", "BRAN", "CATELYN", "CERSEI", "DAENERYS", "JAIME", "JOFFREY", "JON", "SANSA", "TYRION"];
var arrLName = ["STARK", "STARK", "STARK", "LANNISTER", "TARGARYEN", "LANNISTER", "BARATHEON", "SNOW", "STARK", "LANNISTER"];
var arrImage = ["arya.jpg", "bran.jpg", "catelyn.jpg", "cersei.jpg", "daenerys.jpg", "jaime.jpg", "joffrey.jpg", "jon.jpg", "sansa.jpg", "tyrion.jpg"];
var arrGuessedLetters = [];
var strCpuName = "";
var arrCpuName = [];
var strCpuImage = "";
var	intWrong = 0;
var intWrongCounter = 0;
var intIndex = 0;
var intRemaining = 0;
var arrUsedLetters = [];
var intCounterW = 0;
var intCounterL = 0;
var bolStart = false;
var bolPlay = false;

function charSelector() {
		var rndm = Math.floor(Math.random() * arrFName.length);
		strCpuName = (arrFName[rndm] + " " + arrLName[rndm]);
		strCpuImage = arrImage[rndm];
		arrCpuName = strCpuName.split("");
		console.log(strCpuName);
		console.log(strCpuImage);
		console.log(arrCpuName);
}

function currentWord() {
	$("#currentWord").html("");
	$.each(arrCpuName, function(i, letter){
		if (letter !== " ") {
			$("#currentWord").append("<span id='char" + i + "'>_ </span>");
			console.log(letter);
		}
		else {
			$("#currentWord").append("<span>&nbsp;&nbsp;</span>");
			console.log(letter);
		}
	});
}

function play() {
	if (bolPlay == false) {
		charSelector();
		currentWord();
		intRemaining = 12;
		$("#remainingGuesses").html(intRemaining);
		$("guessedLetters").html("");
		$("#wins").html(intCounterW);
		$("#loses").html(intCounterL);
		$("#instructions").css("color", "transparent");
		$("#guessedLetters").html("&nbsp;");
		bolPlay = true;
	};
};


function checker(letter) {
	intWrongCounter = 0;
	$.each(arrCpuName, function(i, val) {

		if (letter !== " " && letter.toUpperCase() == val) {
			$("#char" + i).html(letter.toUpperCase() + "&nbsp;");
		}

		else if (letter.toUpperCase() !== " " && letter.toUpperCase() !== $("#char" + i).text()) {
			intWrongCounter++;	
		}
	})

	if (intWrongCounter == arrCpuName.length) {
		intRemaining--;
		$("#remainingGuesses").html(intRemaining);
		arrGuessedLetters[intIndex] = letter.toUpperCase();
		$("#guessedLetters").append(letter.toUpperCase());
		intIndex++;
	}
	
	// $.each(arrGuessedLetters,function(j, guessed) {
	// 	if (letter.toUpperCase() == arrGuessedLetters[j]) {
	// 		intRemaining++;
	// 	}
	// })
}

function guessedLetters() {
	
	$("guessedLetters").append(event.key);
}


document.onkeyup = function exec(event){
	play();
	checker(event.key);
}

