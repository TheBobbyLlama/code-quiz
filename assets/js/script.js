var startButtonEl = document.querySelector("#startButton");
var questionEl = document.querySelector("#testQuestion");

var beginTest = function() {
	document.querySelector("#buttonHolder").style.display = "none";
	
	questionEl.style.display = "flex";
}

startButtonEl.addEventListener("click", beginTest);
