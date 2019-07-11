var helpOpen = false;

function confirmCancelStory() {
	var leave = confirm("Are you sure you want to cancel? Your story will be deleted!\n\nPress OK to exit. Press Cancel to return to your story.")
	if (leave == true) {
		window.location.href = "/index.html";
	} else {
		//Do nothing!
	}
}

function clearInput() {
	var ideainput = document.getElementById("ideabox");
	ideainput.value = "";
}

function showHelp() {
	if (helpOpen) {
		var help = document.getElementById("helpbox");
		help.className = "hide";
		helpOpen = false;
	} else {
		var help = document.getElementById("helpbox");
		help.className = "";
		helpOpen = true;
	}
}

function init() {
	setInterval(function () {
		if (document.getElementById("ideabox").value != "") {
			document.getElementById("clear").disabled = false;
		} else {
			document.getElementById("clear").disabled = true;
		}
	}, 100);
}

window.onload = init();
