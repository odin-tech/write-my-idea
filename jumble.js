function init() {
	setTimeout(function () {
		//Setup code (runs once)
		setInterval(function () {
			//Loop code (execute every 100ms)
		}, 100);
	}, 500);
}

window.onload = init();
