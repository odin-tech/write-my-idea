var story = [];
var ideanum = 1;
var words = [];
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
	utterThis.pitch = 1;
	utterThis.rate = 0.75;
	synth.speak(utterThis);
}


// NORMAL FUNCTIONS //

function exitJumble() {
	if (confirm("Are you sure you want to quit Jumble?") == true) {
		window.location.assign("open.html");
	} else {
		//Do nothing...
	}
}

function setButtons(idea) {
	if (ideanum > 5) {
		window.location.assign("open.html");
	} else { //Generate Buttons!
		words = idea.split(" ");
		wordbank = document.getElementById("wordbank");
		wordbank.innerHTML = "";
		var numbers = [];
		for (var word in words) {
			numbers.push(word);
		}
		for (var i in words) {
			var num = Math.floor((Math.random() * numbers.length));
			randnum = numbers[num];
			numbers.splice(num, 1);
			wordbank.innerHTML = wordbank.innerHTML + "<button onclick='changeWord(this);' class='wordbutton' id='" + randnum + "'>" + words[randnum] + "</button>";
		}
	}
}

function changeWord(button) {
	var wordnum = button.id;
	var selected = words[wordnum];
	var textbox = document.getElementById('jumbleresult');
	if (button.className == "wordbutton used") {
		//Button is used - do nothing!
	} else {
		//Button is not used
		textbox.value = textbox.value + selected + " ";
		button.className = button.className + " used";
	}
}

function clearInput() {
	var textbox = document.getElementById('jumbleresult');
	textbox.value = "";
	setButtons(story[ideanum - 1]);
}

function checkInput() {
	var textbox = document.getElementById('jumbleresult');
	var input = textbox.value;
	var correct = "";
	for (var word in words) {
		correct = correct + words[word] + " ";
	}
	if (input == correct) {
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
		ideanum = ideanum + 1;
		setButtons(story[ideanum - 1]);
		document.getElementById('ideacounter').innerHTML = "IDEA " + ideanum + "/5";
		textbox.value = "";
	} else {
		document.getElementById('resultnote').className = "";
		setButtons(story[ideanum - 1]);
		textbox.value = "";
	}
}

function readidea() {
	if (synth.speaking == true) {
		synth.cancel();
	} else {
		SpeakText(story[ideanum - 1]);
	}
}

// SETUP FUNCTION //

function init() {
	setTimeout(function () {
		//Setup code (runs once)
		if (sessionStorage.getItem("jumble") == undefined || sessionStorage.getItem("jumble") == null) { //Error! Story not found!
			document.getElementById('loadtitle').innerHTML = "ERROR";
			document.getElementById('loadtext').innerHTML = "Story not found!<br>Exiting...";
			document.getElementById('loadicon').className = "fas fa-exclamation-triangle fa-2x";
			document.getElementById('loadiconcont').className = "ani-flash";
			document.getElementById('loadingscreen').className = "loaderror";
			setTimeout(function () {
				window.location.assign('open.html');
			}, 3000);
		} else {
			story = localStorage.getArray(sessionStorage.getItem("jumble"));
			sessionStorage.removeItem("jumble"); //Remove Jumble key from storage
			setButtons(story[ideanum - 1]);
			setTimeout(function () {
				var loadtext = document.getElementById('loadtext');
				loadtext.innerHTML = "Generating jumble...";
				setTimeout(function () {
					document.getElementById('loadingscreen').className = "loadnormal loaddone";
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