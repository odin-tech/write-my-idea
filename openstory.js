var ideaNum = 1;
var ideas = ["", "", "", "", ""];
var stories = [];
var storyindex = -1;
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
	if (confirm("Are you sure you want to delete the story '" + stories[storyindex] + "' by " + localStorage.getArray(stories[storyindex])[5] + "? It'll be gone forever!\n\nTap OK to delete. Tap Cancel to go back.")) {
		localStorage.deleteArray(stories[storyindex]);
		window.location.reload();
	} else {
		//Do nothing.
	}
}

function speakStory(part) {
	var selected = localStorage.getArray(stories[storyindex]);
	SpeakText(selected[part]);
}

function speakAllStory() {
	var selected = localStorage.getArray(stories[storyindex]);
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
	sessionStorage.setItem("edit", stories[storyindex]);
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
	sessionStorage.setItem("jumble", stories[storyindex]); //Assign Jumble ID.
	window.location.assign("jumble.html"); //Redirect to Jumble page
}

function startspell() {
	sessionStorage.setItem("spell", stories[storyindex]); //Assign Spell ID.
	window.location.assign("spell.html"); //Redirect to Spell page
}

function startdraw() {
	var story = localStorage.getArray(stories[storyindex]);
	var tab = window.open();
	tab.document.write("<!DOCTYPE html><html><head><title>" + stories[storyindex] + " by " + story[5] + " - Write My Idea!</title><link rel='icon' href='favicon.png'><link href='https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:400,400i,600|Mali&display=swap' rel='stylesheet'</head>");
	tab.document.write("<body style='font-family: Barlow Semi Condensed'; font-weight: normal;>");
	tab.document.write("<h1>" + stories[storyindex] + "</h1>");
	tab.document.write("<h3> by " + story[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 50vh;'></div>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[0] + "</h2>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[1] + "</h2>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[2] + "</h2>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[3] + "</h2>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[4] + "</h2>");
	tab.document.write("</body></html>");
}

function startlearn() {
	var story = localStorage.getArray(stories[storyindex]);
	var tab = window.open();
	tab.document.write("<!DOCTYPE html><html><head><title>" + stories[storyindex] + " by " + story[5] + " - Write My Idea!</title><link rel='icon' href='favicon.png'><link href='https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:400,400i,600|Mali&display=swap' rel='stylesheet'></head>");
	tab.document.write("<body style='font-family: Barlow Semi Condensed'>");
	tab.document.write("<h1>" + stories[storyIndex] + "</h1>");
	tab.document.write("<h3> by " + story[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 35vh;'></div>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[0] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[1] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[2] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[3] + "</h2>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<hr>");
	tab.document.write("<h2 style='font-family: Mali;'>" + story[4] + "</h2>");
	tab.document.write("</body></html>");
}

function startlisten() {
	var story = localStorage.getArray(stories[storyindex]);
	var tab = window.open();
	tab.document.write("<!DOCTYPE html><html><head><title>" + stories[storyindex] + " by " + story[5] + " - Write My Idea!</title><link rel='icon' href='favicon.png'><link href='https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:400,400i,600|Mali&display=swap' rel='stylesheet'></head>");
	tab.document.write("<body style='font-family: Barlow Semi Condensed'>");
	tab.document.write("<h1>" + stories[storyIndex] + "</h1>");
	tab.document.write("<h3> by " + story[5] + "</h3>");
	tab.document.write("<div style='border: 2px black solid; width: 90vw; height: 35vh;'></div>");
	tab.document.write("<br><br><br><br>");
	tab.document.write("<em style='color: #eb0000; font-family: Mali;'>Idea 1 (Red)</em>");
	tab.document.write("<hr style='border-color: #eb0000;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #eb0000;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #f59f00; font-family: Mali;'>Idea 2 (Yellow)</em>");
	tab.document.write("<hr style='border-color: #f59f00;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #f59f00;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #00b70e; font-family: Mali;'>Idea 3 (Green)</em>");
	tab.document.write("<hr style='border-color: #00b70e;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #00b70e;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #00b3de; font-family: Mali;'>Idea 4 (Sky Blue)</em>");
	tab.document.write("<hr style='border-color: #00b3de;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #00b3de;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<em style='color: #3857ff; font-family: Mali;'>Idea 5 (Dark Blue)</em>");
	tab.document.write("<hr style='border-color: #3857ff;'>");
	tab.document.write("<br><br><br>");
	tab.document.write("<hr style='border-color: #3857ff;'>");
	tab.document.write("</body></html>");
}

// OTHER FUNCTIONS //

function changeStory(diff) {
	if (diff == 1) {
		storyindex++;
	} else if (diff == -1) {
		storyindex--;
	} else {
		//do nothing
	}
	console.log("Index: " + storyindex + "/" + (stories.length - 1) + " Key: " + stories[storyindex]);
	if (storyindex == stories.length - 1) {
		document.getElementById('nextstory').disabled = true;
	} else {
		document.getElementById('nextstory').disabled = false;
	}
	if (storyindex == -1) {
		document.getElementById('previousstory').disabled = true;
	} else {
		document.getElementById('previousstory').disabled = false;
	}
	document.getElementById('storycard').style = "transform: rotateY(" + ((storyindex * 180)) + "deg);";
	setTimeout(function () {
		document.getElementById('storycontent').style = "transform: rotateY(" + (storyindex * 180) + "deg);";
		var preview = "";
		var title = "";
		var icon = "";
		var iconclass = "";
		if (storyindex == -1) {
			iconclass = "";
			icon = "<i class='fas fa-question-circle'></i>";
			title = "NO STORY SELECTED";
			preview = "Please select a story by using the <i class='fas fa-arrow-left'></i> and <i class='fas fa-arrow-right'></i> buttons.<br>";
		} else {
			iconclass = "hideicon";
			story = localStorage.getArray(stories[storyindex]);
			title = stories[storyindex] + " (by " + story[5] + ")";
			preview = "";
			preview = story[0] + " " + story[1] + " " + story[2] + " " + story[3] + " " + story[4] + "\n";
		}
		document.getElementById('storyicon').innerHTML = icon;
		document.getElementById('storyicon').className = iconclass;
		document.getElementById('storytitle').innerHTML = title;
		document.getElementById("previewstory").innerHTML = preview;
	}, 200);
}

// LOOP & SETUP //

function loop() {
	//Execute once:
	setTimeout(function () {
		document.getElementById('previousstory').disabled = true;
		sessionStorage.removeItem("jumble");
		for (var i = 0, len = localStorage.length; i < len; i++) { //Load list of stories.
			if (localStorage.key(i) == "auth") {
				//skip this one!
			} else {
				stories.push(localStorage.key(i));
			}
		}
		window.addEventListener("keyup", function (event) {
			if (event.key === "ArrowLeft") {
				document.getElementById('previousstory').click();
			} else if (event.key === "ArrowRight") {
				document.getElementById('nextstory').click();
			}
		}); //Listen for left & right arrow keys
		if (stories.length == 0) {
			document.getElementById('storyicon').innerHTML = "<i class='fas fa-times-circle'></i>";
			document.getElementById('storytitle').innerHTML = "NO STORIES";
			document.getElementById('previewstory').innerHTML = "You have no stories! Go to the menu and press NEW STORY to start.";
			document.getElementById('nextstory').disabled = true;
			document.getElementById('previousstory').disabled = true;
		} else {
			document.getElementById('storyicon').innerHTML = "<i class='fas fa-question-circle'></i>";
			document.getElementById('storytitle').innerHTML = "NO STORY SELECTED";
			document.getElementById('previewstory').innerHTML = "Please select a story by using the <i class='fas fa-arrow-left'></i> and <i class='fas fa-arrow-right'></i> buttons.<br>";
		}

		PopulateVoiceList();
		setInterval(function () {
			if (storyindex != -1) {
				document.getElementById("startjumble").disabled = false;
				document.getElementById("startspell").disabled = false;
				document.getElementById("startwrite").disabled = false;
				document.getElementById("startdraw").disabled = false;
				document.getElementById("share").disabled = false;
				document.getElementById("delete").disabled = false;
				document.getElementById("storyhead").className = "";
				document.getElementById("activityhead").className = "highlight";
				document.getElementById("listenhead").className = "highlight";
				document.getElementById("activityselect").className = "selectsection otherselectsection";
				document.getElementById("listenselect").className = "selectsection otherselectsection";
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
				document.getElementById("startspell").disabled = true;
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
				document.getElementById("storyhead").className = "highlight";
				document.getElementById("activityhead").className = "notyet";
				document.getElementById("listenhead").className = "notyet";
				document.getElementById("activityselect").className = "selectsection otherselectsection collapse";
				document.getElementById("listenselect").className = "selectsection otherselectsection collapse";
			}
			if (localStorage.auth != undefined) {
				//do nothing
			} else {
				window.location.replace("index.html");
			}
		}, 100);
	}, 1000);

}

window.on = loop();