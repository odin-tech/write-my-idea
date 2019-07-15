var code = "";
var alerted = false;

var codelist = [["A55371", "T76723", "F01910", "G85967", "C01839"], ["D84860", "P47214", "L49203", "B52333", "V72535"], ["N91750", "M16788", "Z10483", "X02992", "Q15933"], ["H64260", "K10849", "H35581", "D30622", "E42742"], ["B27957", "U46510", "J31682", "Y03635", "S56103"]];

function requestCodes() {
	var coordtext = document.getElementById("coordtext");
	var col = Math.floor((Math.random() * 5));
	var row = Math.floor((Math.random() * 5));
	var displaycol = "";
	code = codelist[row][col];
	switch (col) {
		case 0:
			displaycol = "A";
			break;

		case 1:
			displaycol = "B";
			break;

		case 2:
			displaycol = "C";
			break;

		case 3:
			displaycol = "D";
			break;

		case 4:
			displaycol = "E";
			break;

		default:
			displaycol = "(ERROR)";
	}
	coordtext.innerHTML = displaycol + (row + 1);
}

function checkForAuthorisation() {
	if (localStorage["auth"] != undefined) {
		window.location.replace("menu.html");
	} else {
		requestCodes();
	}
}

function init() {
	setTimeout(function () {
		document.getElementById("codeentry").className = "normal";
		checkForAuthorisation();
		setInterval(function () {
			if (document.getElementById("codeentry").value.length == 6) {
				if (document.getElementById("codeentry").value.toUpperCase() == code) {
					document.getElementById("codeentry").className = "correct";
					localStorage.setItem("auth", code);
					if (!alerted) {
						alert("Device Authorised!\n\nThis device has been successfully authorised. You won't need to enter a code again (unless you clear your browser data).\n\nTo deauthorise this device, tap About on the main menu and tap Remove Key.\n\nTap OK to continue to the menu.");
						setTimeout(function () {
							window.location.replace("menu.html");
						}, 1000);
						alerted = true;
					}
				} else {
					document.getElementById("codeentry").className = "wrong";
				}
			} else {
				document.getElementById("codeentry").className = "normal";
			}
		}, 100);
	}, 500);
}

window.onload = init();
