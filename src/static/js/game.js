/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"
var turn = 1;
var round = 1;
var num_words = 0;
var counter = 0;
var words;

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

		if (num_words > 0) {
			counter += 1;
			num_words -= 1;

			showNextWord();
			updateWordsRemaining();

			if (num_words == 0) {
				$('#word').text("Round complete!")
			}
		}

	});

});

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