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

// NORMAL FUNCTIONS //

function confirmStoryDelete() {
	var pick = document.getElementById("storypick");
	var del = confirm("Are you sure you want to delete the story '" + pick.value + "' by " + localStorage.getArray(pick.value)[5] + "? It'll be gone forever!\n\nTap OK to delete. Tap Cancel to go back.");
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
	SpeakText(selected[0]);
	SpeakText(selected[1]);
	SpeakText(selected[2]);
	SpeakText(selected[3]);
	SpeakText(selected[4]);
}

function stopReadingStory() {
	synth.cancel();
}

function editStory() {
	sessionStorage.setItem("edit", document.getElementById("storypick").value);
	window.location.assign("new.html");
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
	sessionStorage.setItem("jumble", document.getElementById("storypick").value);
	window.location.assign("jumble.html");
}

function startdraw() {
	var pick = document.getElementById("storypick");
	var story = localStorage.getArray(pick.value);
	var tab = window.open();
	tab.document.write("<h1>" + pick.value + "</h1>");
	tab.document.write("<h3> by " + localStorage.getArray(pick.value)[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 70vh;'></div>");
	tab.document.write("<h2>" + story[0] + "</h2>");
	tab.document.write("<h2>" + story[1] + "</h2>");
	tab.document.write("<h2>" + story[2] + "</h2>");
	tab.document.write("<h2>" + story[3] + "</h2>");
	tab.document.write("<h2>" + story[4] + "</h2>");
}

function startlearn() {
	var pick = document.getElementById("storypick");
	var story = localStorage.getArray(pick.value);
	var tab = window.open();
	tab.document.write("<h1>" + pick.value + "</h1>");
	tab.document.write("<h3> by " + localStorage.getArray(pick.value)[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 35vh;'></div>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2>" + story[0] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2>" + story[1] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2>" + story[2] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2>" + story[3] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2>" + story[4] + "</h2>");
}

function startlisten() {
	var pick = document.getElementById("storypick");
	var story = localStorage.getArray(pick.value);
	var tab = window.open();
	tab.document.write("<h1>" + pick.value + "</h1>");
	tab.document.write("<h3> by " + localStorage.getArray(pick.value)[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 35vh;'></div>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<em style='color: #eb0000;'>Idea 1 (Red)</em>");
	tab.document.write("<hr style='border-color: #eb0000;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #eb0000;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #f59f00;'>Idea 2 (Yellow)</em>");
	tab.document.write("<hr style='border-color: #f59f00;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #f59f00;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #00b70e;'>Idea 3 (Green)</em>");
	tab.document.write("<hr style='border-color: #00b70e;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #00b70e;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #00b3de;'>Idea 4 (Sky Blue)</em>");
	tab.document.write("<hr style='border-color: #00b3de;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #00b3de;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #3857ff;'>Idea 5 (Dark Blue)</em>");
	tab.document.write("<hr style='border-color: #3857ff;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #3857ff;'>");
}

// LOOP & SETUP //

function loop() {
	//Execute once:
	setTimeout(function () {
		sessionStorage.removeItem("jumble");
		var pick = document.getElementById("storypick");
		pick.innerHTML = "<option value=''>CHOOSE...</option>";
		for (var i = 0, len = localStorage.length; i < len; i++) { //Load list of stories.
			if (localStorage.key(i) == "auth") {
				//skip this one!
			} else {
				pick.innerHTML = pick.innerHTML + "<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + " (by " + localStorage.getArray(localStorage.key(i))[5] + ")</option>";
			}
		}
		PopulateVoiceList();
		setInterval(function () {
			var story = localStorage.getArray(document.getElementById("storypick").value);
			var preview = "";
			if (document.getElementById("storypick").value == "") {
				preview = "Please select a story above.<br>";
			} else {
				preview = "";
				preview = story[0] + " " + story[1] + " " + story[2] + " " + story[3] + " " + story[4] + "\n";
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
				document.getElementById("edit").disabled = false;
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
				document.getElementById("edit").disabled = true;
				document.getElementById("activityhead").className = "notyet";
				document.getElementById("readhead").className = "notyet";
			}
			if (localStorage["auth"] != undefined) {
				//do nothing
			} else {
				window.location.replace("index.html");
			}
		}, 100);
	}, 500);

}

window.onload = loop();
