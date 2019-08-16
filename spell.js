var story = [];
var words = [];
var wordnum = 1;
var word = "";
var speechVoice;
var synth = window.speechSynthesis;
var jumbleCorrect = false;

// HELPER FUNCTIONS //

Storage.prototype.getArray = function (arrayName) {
	var thisArray = [];
	var fetchArrayObject = this.getItem(arrayName);
	if (typeof fetchArrayObject !== 'undefined') {
		if (fetchArrayObject !== null) {
			thisArray = JSON.parse(fetchArrayObject);
		}
	}
	return thisArray;
};

Storage.prototype.pushArrayItem = function (arrayName, arrayItem) {
	var existingArray = this.getArray(arrayName);
	existingArray.push(arrayItem);
	this.setItem(arrayName, JSON.stringify(existingArray));
};

Storage.prototype.popArrayItem = function (arrayName) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	if (existingArray.length > 0) {
		arrayItem = existingArray.pop();
		this.setItem(arrayName, JSON.stringify(existingArray));
	}
	return arrayItem;
};

Storage.prototype.shiftArrayItem = function (arrayName) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	if (existingArray.length > 0) {
		arrayItem = existingArray.shift();
		this.setItem(arrayName, JSON.stringify(existingArray));
	}
	return arrayItem;
};

Storage.prototype.unshiftArrayItem = function (arrayName, arrayItem) {
	var existingArray = this.getArray(arrayName);
	existingArray.unshift(arrayItem);
	this.setItem(arrayName, JSON.stringify(existingArray));
};

Storage.prototype.deleteArray = function (arrayName) {
	this.removeItem(arrayName);
};

function SearchForString(str, items) {
	for (var i in items) {
		var item = items[i];
		if (str.includes(item)) {
			return true;
		}

	}
	return false;
}

// SPEECH SYNTHESIS //

function PopulateVoiceList() {
	voices = synth.getVoices();

	for (i = 0; i < voices.length; i++) {
		var voice = voices[i];
		if (voice.lang == "EN-US") {
			speechVoice = voice;
			break;
		}
	}
}

function SpeakText(input) {
	var utterThis = new SpeechSynthesisUtterance(input);
	utterThis.voice = speechVoice;
	utterThis.pitch = 1.5;
	utterThis.rate = 0.5;
	synth.speak(utterThis);
}


// NORMAL FUNCTIONS //

function exitJumble() {
	if (confirm("Are you sure you want to quit Spell?") == true) {
		window.location.assign("open.html");
	} else {
		//Do nothing...
	}
}

function setButtons(selectedword) {
	if (wordnum > 10) {
		document.getElementById('successscreen').className = "";
		setTimeout(function () {
			window.location.assign("open.html");
		}, 3000);
	} else { //Generate Buttons!
		SpeakText(word);
		var numbers = [];
		var wordbank = document.getElementById("wordbank");
		wordbank.innerHTML = "";
		for (var letter in selectedword) {
			numbers.push(letter);
		}
		for (var i in selectedword) {
			var num = Math.floor((Math.random() * numbers.length));
			randnum = numbers[num];
			numbers.splice(num, 1);
			wordbank.innerHTML = wordbank.innerHTML + "<button onclick='changeWord(this);' class='wordbutton' id='" + randnum + "'>" + selectedword[randnum] + "</button>";
		}
	}
}

function changeWord(button) {
	var num = button.id;
	var selected = word[num];
	var textbox = document.getElementById('jumbleresult');
	if (button.className == "wordbutton used") {
		//Button is used - do nothing!
	} else {
		//Button is not used
		textbox.value = textbox.value + selected;
		button.className = button.className + " used";
	}
}

function clearInput() {
	var textbox = document.getElementById('jumbleresult');
	textbox.value = "";
	setButtons(word);
}

function checkInput() {
	var textbox = document.getElementById('jumbleresult');
	var input = textbox.value;
	if (input == word) {
		jumbleCorrect = true;
		document.getElementById('resultnote').innerHTML = '<h3><i class="fas fa-check"></i> CORRECT! <button onclick="continueJumble()" id="resultclose" class="closecorrect">NEXT <i class="fas fa-arrow-right"></i></button></h3>';
		document.getElementById('resultnote').className = "correctjumble showresult";
	} else {
		jumbleCorrect = false;
		document.getElementById('resultnote').innerHTML = '<h3><i class="fas fa-times"></i> WRONG... <button onclick="continueJumble()" id="resultclose" class="closewrong">RETRY <i class="fas fa-redo-alt"></i></button></h3>';
		document.getElementById('resultnote').className = "wrongjumble showresult";
	}
}

function continueJumble() {
	var textbox = document.getElementById('jumbleresult');
	if (jumbleCorrect) {
		document.getElementById('resultnote').className = "";
		wordnum = wordnum + 1;
		word = words[Math.floor(Math.random() * words.length)];
		setButtons(word);
		document.getElementById('ideacounter').innerHTML = "WORD " + wordnum + "/10";
		textbox.value = "";
	} else {
		document.getElementById('resultnote').className = "";
		setButtons(word);
		textbox.value = "";
	}
}

function readidea() {
	if (synth.speaking == true) {
		synth.cancel();
	} else {
		SpeakText(word);
	}
}

// SETUP FUNCTION //

function init() {
	setTimeout(function () {
		//Setup code (runs once)
		if (sessionStorage.getItem("spell") == undefined || sessionStorage.getItem("spell") == null) { //Error! Story not found!
			document.getElementById('loadtitle').innerHTML = "ERROR";
			document.getElementById('loadtext').innerHTML = "Story not found!<br>Exiting...";
			document.getElementById('loadicon').className = "fas fa-exclamation-triangle fa-2x";
			document.getElementById('loadiconcont').className = "ani-flash";
			document.getElementById('loadingscreen').className = "loaderror";
			setTimeout(function () {
				window.location.assign('open.html');
			}, 3000);
		} else {
			story = localStorage.getArray(sessionStorage.getItem("spell"));
			sessionStorage.removeItem("spell"); //Remove Jumble key from storage

			//Split the story into it's words
			for (var idea in story) {
				for(var i in story[idea].split(" ")) {
					words.push(story[idea].split(" ")[i]);
				}
			}
			word = words[Math.floor(Math.random() * words.length)];
			setTimeout(function () {
				var loadtext = document.getElementById('loadtext');
				loadtext.innerHTML = "Generating words...";
				setTimeout(function () {
					document.getElementById('loadingscreen').className = "loadnormal loaddone";
					setButtons(word);
				}, 1000);
			}, 1000);
			PopulateVoiceList();
			setInterval(function () {
				if (document.getElementById('jumbleresult').value != "") {
					document.getElementById('nextjumble').disabled = false;
					document.getElementById('clearJumble').disabled = false;
				} else {
					document.getElementById('nextjumble').disabled = true;
					document.getElementById('clearJumble').disabled = true;
				}
				if (synth.speaking) {
					document.getElementById('readidea').className = "stop";
					document.getElementById('readidea').innerHTML = "<i class='fas fa-square'></i>";
				} else {
					document.getElementById('readidea').className = "";
					document.getElementById('readidea').innerHTML = "<i class='fas fa-volume-up'></i>";
				}
			}, 100);
		}
	}, 500);
}

window.onload = init();