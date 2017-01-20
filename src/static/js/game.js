/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"
var turn = 1;

$(document).ready(function() {

	var code = $('#roomCode').text();
	var words;

	$.get(homeURL + "getwords/" + code, function(data, status){
		words = data.split(",")
		// TODO: Shuffle the array
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
		$('#begin').hide();
		$('#gameplay').attr('class', 'container');    // Make it visible

		$('#word').text(words[0])	// Use the first word ------------TODO: Get random word---------------------

		setTimeout(function(){
			$('#word_display').show().delay(1000).fadeOut();
		}, 2000);
	});

	/*
	 * Temporarily shows the word for 2 seconds
	 */
	$('#show_word_btn').click(function () {
		$('#word_display').show().delay(2000).fadeOut();
	});

});

