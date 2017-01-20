/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"

$(document).ready(function() {

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

