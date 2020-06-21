var startButtonEl = document.querySelector("#startButton");
var questionEl = document.querySelector("#testQuestion");
var answerList = questionEl.querySelector("ol");
var answerStatus = questionEl.querySelector("#answerStatus");

var curQuestion = 0;

var loadNextQuestion = function() {
	// TODO - Random question!!!

	questionEl.querySelector("h2").textContent = (curQuestion + 1) + ": " + quizList[curQuestion].question;

	answerList.innerHTML = ""; // Destroy all children

	for (var i = 0; i < quizList[curQuestion].choices.length; i++) {
		var answerEl = document.createElement("li");
		answerEl.setAttribute("data-answer-id", i);
		answerEl.textContent = quizList[curQuestion].choices[i];
		answerList.appendChild(answerEl);
	}

	answerStatus.textContent = "";
}

var answerQuestion = function(event) {
	var correct = (event.target.getAttribute("data-answer-id") == quizList[curQuestion].correct);

	curQuestion++; // Testing code!
	loadNextQuestion();

	answerStatus.textContent = (correct) ? "Correct" : "Wrong";
}

var beginTest = function() {
	document.querySelector("#buttonHolder").style.display = "none";

	questionEl.style.display = "flex";

	loadNextQuestion();
}

startButtonEl.addEventListener("click", beginTest);
answerList.addEventListener("click", answerQuestion);