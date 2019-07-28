var story = [];
var ideanum = 1;

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

function setButtons(idea) {
	words = idea.split(" ");
	wordbank = document.getElementById("wordbank");
	wordbankinnerHTML = "";
	for (word in words) {
		wordbank.innerHTML = wordbank.innerHTML + "<button class='wordbutton'>" + words[word] + "</button>";
	}
}

// SETUP FUNCTION //

function init() {
	setTimeout(function () {
		//Setup code (runs once)
		story = localStorage.getArray(sessionStorage.getItem("jumble"));
		sessionStorage.removeItem("jumble"); //Remove Jumble key from storage
		setButtons(story[ideanum - 1]);
		setInterval(function () {
			//Loop code (execute every 100ms)
		}, 100);
	}, 500);
}

window.onload = init();
