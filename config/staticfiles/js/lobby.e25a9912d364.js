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
     * Redirects to a new game room
     */
    $('#new_game_btn').click(function () {
        window.location.href = homeURL + "lobby/newgame";
    });

    /*
     * Hides the start screen and adds an interface to join an existing game room
     */
    $('#join_game_btn').click(function () {
        $('#startScreen').hide();
        $('#joinScreen').attr('class', 'container');    // Make it visible
    });

    /*
     * Hides the start screen and displays the rules of the game
     */
    $('#how_to_play_btn').click(function () {
        $('#startScreen').hide();
        $('#howtoplayScreen').attr('class', 'container');    // Make it visible
    });

    /*
     * Processes the room code user input and checks to see if it actually exists
     */
    $(document).on('click', '#submit_room_code_btn', function() {
        var code = $('#room_code_box').val().trim();
        code = code.toLowerCase();

        var hasLetter = /[a-z]/i;

        if (hasLetter.test(code)) {
            $('#message').html("The room code should not contain any letters.")
        }
        else if (code.length != 6) {
            $('#message').html("The room code must be 6 numbers.")
        }
        else {
            $.get(homeURL + "search/" + code, function(data, status){
                if (data == "Found") {
                    window.location.href = homeURL + "lobby/" + code;
                }
                else {
                    $('#message').html(code + " not found")
                }
            });
        }
    });

    /*
     * Returns to the start screen from join screen
     */
    $(document).on('click', '#back_btn', function() {
        $('#joinScreen').attr('class', 'hidden');   // Hide it
        $('#howtoplayScreen').attr('class', 'hidden');   // Hide it
        $('#startScreen').show();
    });

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

        if (word.length <= 30) {
	        var roomCode = $('#room_code').text()
	        var code = roomCode.substr(roomCode.length - 6);

	        $.post(homeURL + "addword/", {'word': word, 'code': code}, function(data, status){
	            if (status == "success") {
	                // Clear the text box
	                $('#submit_word_box').val('');

	                // Display success message
	                $('#lobby_message').attr('style', 'color:green');
	                $('#lobby_message').text('Word submitted successfully!')
	            }
	            else {
	                // Display error message
	                $('#lobby_message').attr('style', 'color:red');
	                $('#lobby_message').text('An error occurred while submitting your word.')
	            }

	            // Show the message to the user for 3 seconds
	            $("#lobby_message").show().delay(3000).fadeOut();

	        });
        }
        else {
        	// Word is too long - limit of 30 characters
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word can be at most 30 characters long.')
        }

		// Display message for 3 seconds
	    $("#lobby_message").show().delay(3000).fadeOut();

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

