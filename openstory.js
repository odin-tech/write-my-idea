var ideaNum = 1;
var ideas = ["", "", "", "", ""];
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

function stopReadingStory() {
	synth.cancel();
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
	utterThis.rate = 0.75;
	synth.speak(utterThis);
}

// ACTIVITY FUNCTIONS //

function startjumble() {
	alert("Coming Soon!");
}

function startwrite() {
	var pick = document.getElementById("storypick");
	var write = window.open();
	write.document.write("<h1>" + pick.value + "</h1>");
	write.document.write("Press the button for each idea, and write down what you hear.<br><em>Print this page!</em><br><br><br>1 (Red)<hr><br><br><br>2 (Orange)<hr><br><br><br>3 (Green)<hr><br><br><br>4 (Sky Blue)<hr><br><br><br>5 (Dark Blue)<hr>");
}

function startdraw() {
	var pick = document.getElementById("storypick");
	var draw = window.open();
	draw.document.write("<h1>" + pick.value + "</h1>");
	draw.document.write("Press the button for each idea, write down what you hear, and draw a picture above it.<br><em>Print this page!</em><table style='width: 95vw;'><tr><td style='border: 2px black solid;height: 250px;width:47.5vw;'></td><td style='border: 2px black solid;height: 250px;width:47.5vw;'></td></tr><tr><td style='height: 50px'><br>1 (Red)<hr></td><td style='height: 50px'><br>2 (Orange)<hr></td></tr><tr><td style='border: 2px black solid;height: 250px;width:47.5vw;'></td><td style='border: 2px black solid;height: 250px;width:47.5vw;'></td></tr><tr><td style='height: 50px'><br>3 (Green)<hr></td><td style='height: 50px'><br>4 (Sky Blue)<hr></td></tr><tr><td colspan='2' style='border: 2px black solid;height: 250px;width:47.5vw;'></td></tr><tr><td colspan='2' style='height: 50px'><br>5 (Dark Blue)<hr></td></tr>");
}

function startshare() {
	var pick = document.getElementById("storypick");
	var share = window.open("activity.html");
	share.document.write("<h1>" + pick.value + "</h1>");
	share.document.write("<em>Screenshot or print this page!</em>");
	var story = localStorage.getArray(pick.value);
	for (i in story) {
		share.document.write("<h3>" + story[i] + "</h3>");
	}
}

// LOOP & SETUP //

function loop() {
	//Execute once:
	setTimeout(function () {
		var pick = document.getElementById("storypick");
		pick.innerHTML = "<option value=''>CHOOSE...</option>";
		for (var i = 0, len = localStorage.length; i < len; i++) { //Load list of stories.
			if (localStorage.key(i) == "auth") {
				//skip this one!
			} else {
				pick.innerHTML = pick.innerHTML + "<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>";
			}
		}
		PopulateVoiceList();
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
				document.getElementById("delete").disabled = false;
				document.getElementById("activityhead").className = "";
				document.getElementById("readhead").className = "";
				if (synth.speaking == true) {
					document.getElementById("stopread").disabled = false;
					document.getElementById("read1").disabled = true;
					document.getElementById("read2").disabled = true;
					document.getElementById("read3").disabled = true;
					document.getElementById("read4").disabled = true;
					document.getElementById("read5").disabled = true;
					document.getElementById("readall").disabled = true;
				} else {
					document.getElementById("stopread").disabled = true;
					document.getElementById("read1").disabled = false;
					document.getElementById("read2").disabled = false;
					document.getElementById("read3").disabled = false;
					document.getElementById("read4").disabled = false;
					document.getElementById("read5").disabled = false;
					document.getElementById("readall").disabled = false;
				}
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
				document.getElementById("stopread").disabled = true;
				document.getElementById("delete").disabled = true;
				document.getElementById("activityhead").className = "notyet";
				document.getElementById("readhead").className = "notyet";
			}
			if (localStorage.getItem("auth") != null) {
				//do nothing
			} else {
				window.location.replace("index.html");
			}
		}, 100);
	}, 500)

}

window.onload = loop();
