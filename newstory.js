var helpOpen = false;
var ideaNum = 1;
var ideas = ["", "", "", "", ""];
var banwords = [""];

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

function confirmCancelStory() {
	var leave = confirm("Are you sure you want to cancel? Your story will be deleted!\n\Tap OK to exit. Tap Cancel to return to your story.")
	if (leave == true) {
		window.location.href = "menu.html";
	} else {
		//Do nothing!
	}
}

function clearInput() {
	var ideainput = document.getElementById("ideabox");
	ideainput.value = "";
}

function showHelp() {
	var help = document.getElementById("helpbox");
	var icon = document.getElementById("helpicon");
	if (helpOpen) {
		help.className = "hide";
		icon.className = "fas fa-question-circle";
		helpOpen = false;
	} else {
		help.className = "";
		icon.className = "fas fa-times-circle";
		helpOpen = true;
	}
}


function saveInput() {
	if (ideaNum < 5) {
		var idea = document.getElementById("ideabox");
		idea.disabled = false;
		var idea = document.getElementById("ideabox");
		ideas[ideaNum - 1] = idea.value;
		ideaNum = ideaNum + 1;
		if (idea.value != undefined) {
			idea.value = ideas[ideaNum - 1];
		} else {
			idea.value = "";
		}
		var numDisplay = document.getElementById("progtext");
		numDisplay.innerHTML = "<span class='bold'>" + ideaNum + "</span> of 5";
		var progress = document.getElementById("progbar");
		progress.className = "progfill" + ideaNum;
	} else if (ideaNum == 5) {
		var idea = document.getElementById("ideabox");
		ideas[ideaNum - 1] = idea.value;
		idea.value = "";
		ideaNum = 10;
		var numDisplay = document.getElementById("progtext");
		numDisplay.innerHTML = "ENTER STORY NAME";
		var cancel = document.getElementById("cancel");
		cancel.disabled = true;
	} else if (ideaNum == 10) {
		var numDisplay = document.getElementById("progtext");
		numDisplay.innerHTML = "<i class='fas fa-spinner fa-pulse'></i> SAVING STORY...";
		var idea = document.getElementById("ideabox");
		idea.disabled = true;
		var next = document.getElementById("nextIdea");
		next.disabled = true;
		setTimeout(function () {
			var input = document.getElementById("ideabox");
			for (var i in ideas) {
				localStorage.pushArrayItem(input.value, ideas[i]);
			}
			var numDisplay = document.getElementById("progtext");
			numDisplay.innerHTML = "<i class='fas fa-check'></i> DONE! PLEASE WAIT...";
			setTimeout(function () {
				window.location.href = "menu.html";
			}, 1000);
		}, 1000);

	}
}

function loadInput() {
	var idea = document.getElementById("ideabox");
	ideaNum = ideaNum - 1;
	if (idea.value != undefined) {
		idea.value = ideas[ideaNum - 1];
	} else {
		idea.value = "";
	}
	var numDisplay = document.getElementById("progtext");
	numDisplay.innerHTML = "<span class='bold'>" + ideaNum + "</span> of 5";
	var progress = document.getElementById("progbar");
	progress.className = "progfill" + ideaNum;
}

function loop() {
	setInterval(function () {
		if (document.getElementById("ideabox").value != "") {
			document.getElementById("clear").disabled = false;
			document.getElementById("nextIdea").disabled = false;
			if (SearchForString(document.getElementById("ideabox").value.toLowerCase(), banwords) == true) {
				document.getElementById("nextIdea").disabled = true;
				document.getElementById("ideabox").className = "explicit";
			} else {
				document.getElementById("nextIdea").disabled = false;
				document.getElementById("ideabox").className = "";
			}
		} else {
			document.getElementById("clear").disabled = true;
			document.getElementById("nextIdea").disabled = true;
			document.getElementById("ideabox").className = "";
		}
		if (ideaNum == 1 || ideaNum == 10) {
			document.getElementById("prevIdea").disabled = true;
		} else {
			document.getElementById("prevIdea").disabled = false;
		}
		if (localStorage["auth"] != undefined) {
			//do nothing
		} else {
			window.location.replace("index.html");
		}
	}, 100);
}

window.onload = loop();
