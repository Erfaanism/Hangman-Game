var arrFName = ["ARYA", "BRAN", "CERSEI", "DAENERYS", "JAMIE", "JON", "JORAH", "SANSA", "THEON", "TYRION"];
var arrLName = ["STARK", "STARK", "LANNISTER", "TARGARYEN", "LANNISTER", "SNOW", "MORMONT", "STARK", "GREYJOY", "LANNISTER"];
var arrImage = ["arya.jpg", "bran.jpg", "cersei.jpg", "daenerys.jpg", "jamie.jpg", "jon.jpg", "jorah.jpg", "sansa.jpg", "theon.jpg", "tyrion.jpg"];
var cpuName = "";
var cpuImage = "";
var remaining = 0;
var usedLetters = [];
var counterW = 0;
var counterL = 0;
var play = false;

function charSelector() {
	// if (play == false) {
		var rndm = Math.floor(Math.random() * arrFName.length);
		cpuName = (arrFName[rndm] + " " + arrLName[rndm]);
		cpuImage = arrImage[rndm];
		console.log(cpuName);
		console.log(cpuImage);
	// 	play = true;
	// }
}

document.onkeyup = function exec(event){
	console.log(event.key);
	charSelector();
}

