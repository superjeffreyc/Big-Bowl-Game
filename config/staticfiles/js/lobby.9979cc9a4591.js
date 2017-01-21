/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"
var words_contributed = 0;

$(document).ready(function() {

    /*
     * Returns to the start screen from lobby
     */
    $(document).on('click', '#back_home_btn', function() {
        window.location.href = homeURL;
    });

    /*
     * Processes the user submitted word and adds it to the database
     */
    $('#submit_word_btn').click(function () {
        var word = $('#submit_word_box').val().trim();
        var hasSpecialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/

        if (word == '') {
            // Word cannot be blank
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word cannot be blank or spaces.')
        }
        else if (hasSpecialChar.test(word)) {
            // Word cannot contain special characters
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word cannot contain special characters.')
        }
        else if (word.length > 30) {
            // Word is too long - limit of 30 characters
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word can be at most 30 characters long.')
        }
        else {
	        var code = getRoomCode();

	        $.post(homeURL + "addword/", {'word': word, 'code': code}, function(data, status){
	            if (status == "success") {
	                // Clear the text box
	                $('#submit_word_box').val('');

	                // Display success message
	                $('#lobby_message').attr('style', 'color:green');
	                $('#lobby_message').text('Word submitted successfully!')

	                // Update contribution to room
	                words_contributed += 1;
	                $('#contribution').text('You have contributed ' + words_contributed + " word(s)")
	            }
	            else {
	                // Display error message
	                $('#lobby_message').attr('style', 'color:red');
	                $('#lobby_message').text('An error occurred while submitting your word.')
	            }

	        });
        }

		// Display message for 3 seconds
	    $("#lobby_message").show().delay(3000).fadeOut();


    });

    /*
     * Moves to the game page
     */
    $('#start_game_btn').click(function () {

        var code = getRoomCode();

        $.get(homeURL + "getcount/" + code, function(data, status){

            if (data >= 5) {
                window.location.href = homeURL + "game/" + code;
            }
            else {
                $('#lobby_message').attr('style', 'color:red');
                $('#lobby_message').text('The word bank must have at least 5 words.')
    	        $("#lobby_message").show().delay(3000).fadeOut();
            }
        });
    });

    /*
     * Run this function periodically to update the word count in the lobby
     */
    setInterval(function() {
        var roomCode = $('#room_code').text()

        // User is in the lobby since the room code is being displayed. Update word count every second.
        if (roomCode != '') {
            var code = roomCode.substr(roomCode.length - 6);

            $.get(homeURL + "getcount/" + code, function(data, status){
                $('#word_count').text("Word Bank Count: " + data)
            });
        }

    }, 1000);

});

function getRoomCode() {
    var roomCode = $('#room_code').text()
	var code = roomCode.substr(roomCode.length - 6);
	return code;
}
