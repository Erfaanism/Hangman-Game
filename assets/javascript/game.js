$(document).ready(function() {

	var arrFName = ["ARYA", "BENJEN", "BRAN", "CATELYN", "CERSEI", "DAENERYS", "EURON", "JAIME", "JOFFREY", "JON", "MARGAREY", "ROBB", "ROBERT", "SANSA", "STANNIS", "THEON", "TYRION", "TYWIN"];
	var arrLName = ["STARK", "STARK", "STARK", "STARK", "LANNISTER", "TARGARYEN", "GREYJOY", "LANNISTER", "BARATHEON", "SNOW", "TYRELL", "STARK", "BARATHEON", "STARK", "BARATHEON", "GREYJOY", "LANNISTER", "LANNISTER"];
	var arrImage = ["arya.jpg", "benjen.jpg", "bran.jpg", "catelyn.jpg", "cersei.jpg", "daenerys.jpg", "euron.jpg", "jaime.jpg", "joffrey.jpg", "jon.jpg", "margarey.jpg", "robb.jpg", "robert.jpg", "sansa.jpg", "stannis.jpg", "theon.jpg", "tyrion.jpg", "tywin.jpg"];
	var arrHint = ["stark.jpg", "stark.jpg", "stark.jpg", "stark.jpg", "lannister.jpg", "targaryen.jpg", "greyjoy.jpg", "lannister.jpg", "baratheon.jpg", "stark.jpg", "tyrell.jpg", "stark.jpg", "baratheon.jpg", "stark.jpg", "baratheon.jpg", "greyjoy.jpg", "lannister.jpg", "lannister.jpg"];
	var strCpuName = "";
	var arrCpuName = [];
	var arrRevealedLetters =[];
	var strCpuImage = "";
	var strHintImage = "";
	var intWrongCounter = 0;
	var intRemaining = 0;
	var arrUsedLetters = [];
	var intCounterW = 0;
	var intCounterL = 0;
	var bolPlay = false;
	var arrCopyFName = arrFName.slice(0);
	var arrCopyLName = arrLName.slice(0);
	var arrCopyImage = arrImage.slice(0);
	var arrCopyHint = arrHint.slice(0);

	function charSelector() {
		if (arrCopyFName.length < 1) {
			arrCopyFName = arrFName.slice(0);
			arrCopyLName = arrLName.slice(0);
			arrCopyImage = arrImage.slice(0);
			arrCopyHint = arrHint.slice(0);
		}
		var rndm = Math.floor(Math.random() * arrCopyFName.length);
		strCpuName = (arrCopyFName[rndm] + " " + arrCopyLName[rndm]);
		strCpuImage = arrCopyImage[rndm];
		strHintImage = arrCopyHint[rndm];
		arrCpuName = strCpuName.split("");
		arrCopyFName.splice(rndm, 1);
		arrCopyLName.splice(rndm, 1);
		arrCopyImage.splice(rndm, 1);
		arrCopyHint.splice(rndm, 1);
	};

	function currentWord() {
		$("#currentWord").empty();
		$.each(arrCpuName, function(i, letter){
			if (letter !== " ") {
				$("#currentWord").append("<span id='char" + i + "'>_ </span>");
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
			$("#charImg").attr("src", "assets/images/got.jpg");
			$("#hangmanImg").attr("src", "assets/images/hang/hang.png");
			$("#hintImg").attr("src", "assets/images/hints/hint.png");
			bolPlay = true;
		}
	}

	function wining(){
		$("#instructions").html("You won!<br>Press Enter to restart the Game!").css("color", "#ddd");
		bolPlay = false;
		intCounterW++;
		$("#wins").html(intCounterW);
		$("#charImg").attr("src", "assets/images/characters/" + strCpuImage);
		$("#hintImg").attr("src", "assets/images/hints/" + strHintImage);
	}

	function losing() {
		$("#instructions").html("Game Over, Please try again!<br>Press Enter to restart the Game!").css("color", "#ddd");
		bolPlay = false;
		intCounterL++;
		$("#loses").html(intCounterL);
		$("#charImg").attr("src", "assets/images/characters/" + strCpuImage);
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
			$("#guessedLetters").append(letter.toUpperCase());

			switch (intRemaining) {
				case 5:
				$("#hangmanImg").attr("src", "assets/images/hang/hang1.png");
				break;
				case 4:
				$("#hangmanImg").attr("src", "assets/images/hang/hang2.png");
				break;
				case 3:
				$("#hangmanImg").attr("src", "assets/images/hang/hang3.png");
				break;
				case 2:
				$("#hangmanImg").attr("src", "assets/images/hang/hang4.png");
				$("#hintImg").attr("src", "assets/images/hints/" + strHintImage);
				break;
				case 1:
				$("#hangmanImg").attr("src", "assets/images/hang/hang5.png");
				break;
				case 0:
				$("#hangmanImg").attr("src", "assets/images/hang/hang6.png");
				break;
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
});