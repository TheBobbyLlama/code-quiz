var contentEl = document.querySelector("#mainContent");

var timeLeft;
var timer;
var questionNumber
var correctAnswers;
var curQuestion;
var askedQuestions = [];

var timerTick = function() {
	timeLeft--;

	if (timeLeft <= 0) {
		timeLeft = 0;
		endTest();
	}

	document.querySelector("#timer").textContent = "Time: " + timeLeft;
}

var loadNextQuestion = function() {
	questionNumber++;

	// Select the next question randomly, but don't allow repeats.
	do {
		curQuestion = Math.floor(quizList.length * Math.random());
	} while (askedQuestions.indexOf(curQuestion) > -1)

	askedQuestions.push(curQuestion);

	contentEl.querySelector("h2").textContent = questionNumber + ": " + quizList[curQuestion].question;

	var answerList = contentEl.querySelector("ol");
	answerList.innerHTML = "";

	for (var i = 0; i < quizList[curQuestion].choices.length; i++) {
		var answerEl = document.createElement("li");
		answerEl.setAttribute("data-answer-id", i);
		answerEl.textContent = quizList[curQuestion].choices[i];
		answerList.appendChild(answerEl);
	}
}

var answerQuestion = function(event) {
	if (event.target.getAttribute("data-answer-id") == quizList[curQuestion].correct) {
		contentEl.querySelector("#answerStatus").textContent =  "Correct!";
		correctAnswers++;
	}
	else {
		answerStatus.textContent =  "Wrong!";
		// Burn 9 seconds, then call an immediate timer tick to burn another second, for 10 total.
		timeLeft -= 9;
		timerTick();

		// Burned out the clock, the timer function will have ended the test for us.
		if (timeLeft <= 0)
			return;
	}

	// No more questions to load, we're done!
	if ((questionNumber >= 10) || (askedQuestions.length >= quizList.length))
		endTest();
	else
		loadNextQuestion();
}

var beginTest = function() {
	var createMe;

	askedQuestions = []; // Clear asked question storage.
	questionNumber = 0; // Will increment to 1 immediately.
	correctAnswers = 0;

	contentEl.innerHTML = "";

	/* ----- Add Header ----- */
	contentEl.appendChild(document.createElement("h2"));
	/* ----- Add List for Answers ----- */
	createMe = document.createElement("ol");
	createMe.addEventListener("click", answerQuestion);
	contentEl.appendChild(createMe);
	/* ----- Add Answer Status ----- */
	createMe = document.createElement("div");
	createMe.setAttribute("id", "answerStatus");
	contentEl.appendChild(createMe);

	loadNextQuestion();

	// Extra second on the timer because we're firing an immediate tick to update the timer display, which will decrement it.
	timeLeft = 61;
	timerTick();
	timer = setInterval(timerTick, 1000);
}

var endTest = function() {
	clearInterval(timer);

	if (timeLeft > 0)
		showGameOver();
	else
		showResetOptions();
}

var showGameOver = function() {
	var createMe;
	var createChild;

	contentEl.innerHTML = "";

	/* ----- Add Header ----- */
	createMe = document.createElement("h2");
	createMe.textContent = "You got a score of " + timeLeft + "!";
	contentEl.appendChild(createMe);

	/* ----- Add Congrats Text ----- */
	createMe = document.createElement("p");
	createMe.textContent = "Congratulations!  Please enter your name/initials!";
	contentEl.appendChild(createMe);

	/* ----- Add High Score Entry ----- */
	createMe = document.createElement("div");
	createMe.className = "results";
		/* ----- Add Text Entry ----- */
		createChild = document.createElement("input");
		createChild.setAttribute("type", "text");
		createChild.setAttribute("id", "HSname");
		createMe.appendChild(createChild);
		/* ----- Add Confirm Button ----- */
		createChild = document.createElement("button");
		createChild.setAttribute("type", "button");
		createChild.addEventListener("click", submitHighScore);
		createChild.textContent = "Submit";
		createMe.appendChild(createChild);
	contentEl.appendChild(createMe);
}

var submitHighScore = function() {
	var myName = contentEl.querySelector("#HSname").value;

	if (myName) {
		var highScores = localStorage.getItem("highScores");

		if (highScores)
			highScores = JSON.parse(highScores);
		else
			highScores = [];

		highScores.push({ name: myName, score: timeLeft });

		localStorage.setItem("highScores", JSON.stringify(highScores));

		showResetOptions();
	}
}

var showResetOptions = function() {
	contentEl.innerHTML = "";

	var createMe;
	var createChild;

	contentEl.innerHTML = "";

	/* ----- Add Header ----- */
	createMe = document.createElement("h2");
	createMe.textContent = "You got a score of " + timeLeft + "!";
	contentEl.appendChild(createMe);

	/* ----- Add High Score Entry ----- */
	createMe = document.createElement("div");
	createMe.className = "results";
		/* ----- Add Go Back Button ----- */
		createChild = document.createElement("button");
		createChild.setAttribute("type", "button");
		createChild.textContent = "Go Back";
		createChild.addEventListener("click", resetPage);
		createMe.appendChild(createChild);
		/* ----- Add Clear High Scores Button ----- */
		createChild = document.createElement("button");
		createChild.setAttribute("id", "clear");
		createChild.setAttribute("type", "button");
		createChild.textContent = "Clear High Scores";
		if (localStorage.getItem("highScores"))
			createChild.addEventListener("click", clearHighScores);
		else
			createChild.setAttribute("disabled", null);
		createMe.appendChild(createChild);
	contentEl.appendChild(createMe);
}

var clearHighScores = function(event) {
	localStorage.removeItem("highScores");
	event.target.disabled = true;
	event.target.removeEventListener("click", clearHighScores);
}

var resetPage = function() {
	var createMe;
	contentEl.innerHTML = "";

	/* ----- Add Header ----- */
	createMe = document.createElement("h1");
	createMe.textContent = "Javascript Coding Test Challenge!";
	contentEl.appendChild(createMe);

	/* ----- Add Intro Text ----- */
	createMe = document.createElement("p");
	createMe.textContent = "Answer up to 10 questions before time runs out, but beware!  Each wrong answer will cost you 5 seconds!";
	contentEl.appendChild(createMe);

	/* ----- Add Start Button ----- */
	createMe = document.createElement("button");
	createMe.textContent = "Click to Begin!";
	createMe.className = "large";
	createMe.setAttribute("type", "button");
	createMe.addEventListener("click", beginTest);
	contentEl.appendChild(createMe);
}

resetPage();