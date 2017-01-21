/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"
var turn = 1;
var timeLimit = 60;
var timeRemaining = timeLimit;
var interval;
var round = 1;
var num_words = 0;
var counter = 0;
var words;
var team1score = 0;
var team2score = 0;


$(document).ready(function() {

	var code = $('#roomCode').text();

	$.get(homeURL + "getwords/" + code, function(data, status){
		words = data.split(",")
		num_words = words.length
		shuffle(words)
	});

	/*
	 * Prompt before leaving lobby
	 */
	$(window).bind('beforeunload', function(){
		return 'Are you sure you want to leave?';
	});

	/*
	 * Begins the game, starting with Team 1
	 */
	$('#begin_btn').click(function () {
		if (num_words > 0) {
			$('#begin').hide();
			$('#gameplay').attr('class', 'container');    // Make it visible

			showNextWord();

			interval = setInterval(function() {
				timeRemaining -= 1;
			    $('#timer').text("Seconds remaining: " + timeRemaining);

			    if (timeRemaining == 0) {
			    	clearInterval(interval);
					switchTurns();
			    }
			}, 1000);
		}
	});

	/*
	 * Temporarily shows the word for 2 seconds
	 */
	$('#show_word_btn').click(function () {
		$('#word_display').show().delay(2000).fadeOut();
	});

	/*
	 * Team guessed the word correctly
	 */
	$('#correct_btn').click(function () {

		if (turn == 1) team1score += 1;
		else team2score += 1;
		updateTeamScore();

		if (num_words > 0) {
			counter += 1;
			num_words -= 1;
			updateWordsRemaining();

			if (num_words == 0) {
				$('#word').text("Round complete!")
				clearInterval(interval);
				updateRound();
				switchTurns();
			}
			else {
				showNextWord();
			}
		}

	});

});

/*
 * Update team score after a correct guess
 */
function updateTeamScore() {
	if (turn == 1) {
		$('#team1pts').text("Team 1 Score: " + team1score);
	}
	else {
		$('#team2pts').text("Team 2 Score: " + team2score);
	}
}

/*
 * Switch turns after the timer is up
 */
function switchTurns() {
	if (turn == 1) turn = 2;
	else turn = 1;

	timeRemaining = timeLimit;	// Reset the timer

	// Reset the UI and show the next team's turn
	$('#begin').show();
	$('#gameplay').attr('class', 'hidden');
	$('#turn').text("Team " + turn + " Turn")
	$('#timer').text("Seconds remaining: 60");

}

/*
 * Update the round
 */
function updateRound() {

	round += 1;

	if (round <= 3) {

		// Update the display
		var roundName;

		if (round == 2) roundName = "CHARADES";
		else roundName = "PASSWORD";

		$('#round').text("ROUND " + round + ": " + roundName);

		// Reshuffle the array and reset words remaining
		counter = 0;
		shuffle(words)
		num_words = words.length
		updateWordsRemaining();

		// Show the begin button
		$('#begin').show();
		$('#gameplay').attr('class', 'hidden');    // Make it hidden


	}
	else {
		$('#gameplay').attr('class', 'hidden');    // Make it hidden
		$('#game_over').attr('class', 'container');

		var winner;

		if (team1score > team2score) winner = "Team 1 Wins!";
		else if (team2score > team1score) winner = "Team 2 Wins!";
		else winner = "Tie Game!";

		$('#game_over_message').text(winner)

	}
}

/*
 * Update the word count remaining on the screen
 */
function updateWordsRemaining() {
	$('#word_count').text("Words remaining: " + num_words);
}

/*
 * Get next word from the word bank and display it to the user
 */
function showNextWord() {
	$('#word').text(words[counter])

	setTimeout(function(){
		$('#word_display').show().delay(2000).fadeOut();
	}, 0);
}

/*
 * Fisher-Yates/Knuth Shuffle Algorithm
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}