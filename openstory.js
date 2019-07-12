var ideaNum = 1;
var ideas = ["", "", "", "", ""];
var banwords = ["badword", "wordbad", "bad word", "word bad"];
var synth = window.speechSynthesis;
var speechVoice;

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
}

Storage.prototype.pushArrayItem = function (arrayName, arrayItem) {
	var existingArray = this.getArray(arrayName);
	existingArray.push(arrayItem);
	this.setItem(arrayName, JSON.stringify(existingArray));
}

Storage.prototype.popArrayItem = function (arrayName) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	if (existingArray.length > 0) {
		arrayItem = existingArray.pop();
		this.setItem(arrayName, JSON.stringify(existingArray));
	}
	return arrayItem;
}

Storage.prototype.shiftArrayItem = function (arrayName) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	if (existingArray.length > 0) {
		arrayItem = existingArray.shift();
		this.setItem(arrayName, JSON.stringify(existingArray));
	}
	return arrayItem;
}

Storage.prototype.unshiftArrayItem = function (arrayName, arrayItem) {
	var existingArray = this.getArray(arrayName);
	existingArray.unshift(arrayItem);
	this.setItem(arrayName, JSON.stringify(existingArray));
}

Storage.prototype.deleteArray = function (arrayName) {
	this.removeItem(arrayName);
}

function SearchForString(str, items) {
	for (var i in items) {
		var item = items[i];
		if (str.includes(item)) {
			return true;
		}

	}
	return false;
}

// NORMAL FUNCTIONS //

function confirmStoryDelete() {
	var pick = document.getElementById("storypick");
	var del = confirm("Are you sure you want to delete the story '" + pick.value + "'? This cannot be undone!\n\nTap OK to delete. Tap Cancel to go back.");
	if (del) {
		localStorage.deleteArray(pick.value);
		window.location.reload();
	} else {
		//Do nothing.
	}
}

function speakStory(part) {
	var pick = document.getElementById("storypick");
	var selected = localStorage.getArray(pick.value);
	SpeakText(selected[part]);
}

function speakAllStory() {
	var pick = document.getElementById("storypick");
	var selected = localStorage.getArray(pick.value);
	for (i in selected) {
		SpeakText(selected[i]);
	}
}

// SPEECH SYNTHESIS (from MDN Web Documentation) //

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
	utterThis.rate = 1;
	synth.speak(utterThis);
}

// LOOP & SETUP //

function loop() {
	//Execute once:
	setTimeout(function () {
		var pick = document.getElementById("storypick");
		pick.innerHTML = "<option value=''>CHOOSE...</option>";
		for (var i = 0, len = localStorage.length; i < len; i++) { //Load list of stories.
			pick.innerHTML = pick.innerHTML + "<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>";
		}
		PopulateVoiceList();
	}, 500)
	setInterval(function () {
		var story = localStorage.getArray(document.getElementById("storypick").value);
		if (document.getElementById("storypick").value == "") {
			var preview = "Please select a story above.<br>";
		} else {
			var preview = "";
			for (i in story) {
				preview = preview + story[i] + "\n";
			}
		}
		document.getElementById("previewstory").innerHTML = preview;
		if (document.getElementById("storypick").value != "") {
			document.getElementById("startjumble").disabled = false;
			document.getElementById("startwrite").disabled = false;
			document.getElementById("startdraw").disabled = false;
			document.getElementById("share").disabled = false;
			document.getElementById("read1").disabled = false;
			document.getElementById("read2").disabled = false;
			document.getElementById("read3").disabled = false;
			document.getElementById("read4").disabled = false;
			document.getElementById("read5").disabled = false;
			document.getElementById("readall").disabled = false;
			document.getElementById("delete").disabled = false;
			document.getElementById("activityhead").className = "";
			document.getElementById("readhead").className = "";
		} else {
			document.getElementById("startjumble").disabled = true;
			document.getElementById("startwrite").disabled = true;
			document.getElementById("startdraw").disabled = true;
			document.getElementById("share").disabled = true;
			document.getElementById("read1").disabled = true;
			document.getElementById("read2").disabled = true;
			document.getElementById("read3").disabled = true;
			document.getElementById("read4").disabled = true;
			document.getElementById("read5").disabled = true;
			document.getElementById("readall").disabled = true;
			document.getElementById("delete").disabled = true;
			document.getElementById("activityhead").className = "notyet";
			document.getElementById("readhead").className = "notyet";
		}
	}, 100);
}

window.onload = loop();
