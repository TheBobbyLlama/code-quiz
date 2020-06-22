var showHighScores = function() {
	var scoreList = document.querySelector("#highScores ol");
	var highScores = localStorage.getItem("highScores");

	if (highScores)
		highScores = JSON.parse(highScores);
	else
		highScores = [];

	var highest = getHighestScore(highScores);

	while (highest) {
		var createChild;
		var listEl = document.createElement("li");
			/* ----- Add Score Name/Value ----- */
			createChild = document.createElement("h2");
			createChild.textContent = highest.name + ": " + highest.score;
			listEl.appendChild(createChild);
		scoreList.appendChild(listEl);

		highest.score = -1; // Blow up the score in this entry, so we don't see it again.
		highest = getHighestScore(highScores);
	}
};

var getHighestScore = function(scores) {
	if (!scores)
		return null;

	var highestScore = scores[0].score;
	var highestIndex = 0;

	for (var i = 1; i < scores.length; i++) {
		if (scores[i].score > highestScore) {
			highestScore = scores[i].score;
			highestIndex = i;
		}
	}

	if (highestScore > 0)
		return scores[highestIndex];
	else
		return null;
}

showHighScores();