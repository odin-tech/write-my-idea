var story = [];
var ideanum = 1;
var words = [];

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

function exitJumble() {
	if (confirm("Are you sure you want to quit Jumble?") == true) {
		window.location.assign("open.html");
	} else {
		//Do nothing...
	}
}

function setButtons(idea) {
	if (ideanum > 5) {
		alert("Jumble Completed!");
		window.location.assign("open.html");
	} else {
		words = idea.split(" ");
		wordbank = document.getElementById("wordbank");
		wordbank.innerHTML = "";
		for (var word in words) {
			wordbank.innerHTML = wordbank.innerHTML + "<button onclick='changeWord(this);' class='wordbutton' id='" + word + "'>" + words[word] + "</button>";
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
		alert("Correct!");
		ideanum = ideanum + 1;
		setButtons(story[ideanum - 1]);
		document.getElementById('ideacounter').innerHTML = "IDEA " + ideanum + "/5";
		textbox.value = "";
	} else {
		alert("Incorrect!");
		setButtons(story[ideanum - 1]);
		textbox.value = "";
	}
}

// SETUP FUNCTION //

function init() {
	setTimeout(function () {
		//Setup code (runs once)
		story = localStorage.getArray(sessionStorage.getItem("jumble"));
		sessionStorage.removeItem("jumble"); //Remove Jumble key from storage
		setButtons(story[ideanum - 1]);
		var loadingtext = document.getElementById('loadingbar');
		loadingtext.parentNode.removeChild(loadingtext);
		setInterval(function () {
			if (document.getElementById('jumbleresult').value != "") {
				document.getElementById('nextside').disabled = false;
				document.getElementById('clear').disabled = false;
			} else {
				document.getElementById('nextside').disabled = true;
				document.getElementById('clear').disabled = true;
			}
		}, 100);
	}, 500);
}

window.onload = init();