var ideaNum = 1;
var ideas = ["", "", "", "", ""];
var banwords = ["badword", "wordbad", "bad word", "word bad"];

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

function loop() {
	//Execute once:
	setTimeout(function () {
		var pick = document.getElementById("storypick");
		pick.innerHTML = "<option value=''>CHOOSE...</option>";
		for (var i = 0, len = localStorage.length; i < len; i++) { //Load list of stories.
			pick.innerHTML = pick.innerHTML + "<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>";
		}
	}, 500)
	setInterval(function () {
		var story = localStorage.getArray(document.getElementById("storypick").value);
		if (document.getElementById("storypick").value == "") {
			var preview = "Please select a story above.";
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
		} else {
			document.getElementById("startjumble").disabled = true;
			document.getElementById("startwrite").disabled = true;
			document.getElementById("startdraw").disabled = true;
			document.getElementById("share").disabled = true;
		}
	}, 100);
}

window.onload = loop();
