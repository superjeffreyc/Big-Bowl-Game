/* global $ */

/***** LOBBY VARS *****/
var words_contributed = 0;
var word_count_interval;

/***** GAME VARS *****/
var turn = 1;
var timeLimit = 60;
var timeRemaining = timeLimit;
var interval;
var display;
var round = 1;
var num_words = 0;
var counter = 0;
var words;
var team1score = 0;
var team2score = 0;
var code;

$(document).ready(function() {

	/***************************************************************************/
    /************************* HOME FUNCTIONS *********************************/
    /***************************************************************************/

	function goHome() {
		// Show home screen and hide anything else that may be visible
		$('#startScreen').show();
        $('#joinScreen').attr('class', 'hidden');
        $('#lobby').attr('class', 'hidden');
        $('#gameScreen').attr('class', 'hidden');

        // Reset any room codes
        code = "";
        $('#gameRoomCode').text('');
    	$('#room_code').text('Room Code: ');
	}

	/*
     * Redirects to a new game room
     */
    $('#new_game_btn').click(function () {
    	$('#startScreen').hide();
        $('#lobby').attr('class', 'container');    // Make it visible
        setupLobby();
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
        var userCode = $('#room_code_box').val().trim();
        var hasLetter = /[a-z]/i;
		var hasSpecialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

        if (hasLetter.test(userCode)) {
            $('#message').text("The room code should not contain any letters.");
        }
        else if (hasSpecialChar.test(userCode)) {
        	$('#message').text("The room code should not contain any special characters.");
        }
        else if (userCode.length != 6) {
            $('#message').text("The room code must be 6 numbers.");
        }
        else {
            $.get("/search/" + userCode, function(data, status){
                if (data == "Found") {
                	code = userCode;
			        $('#joinScreen').attr('class', 'hidden');    // Make it visible
			        $('#lobby').attr('class', 'container');    // Make it visible
			        joinLobby();
                }
                else {
                    $('#message').text(data);
                }
            });
        }

        // Display message to user regarding room code submission
        $("#message").show().delay(3000).fadeOut();
    });

    /*
     * Returns to the start screen from join screen
     */
    $(document).on('click', '#back_btn', function() {
        $('#joinScreen').attr('class', 'hidden');   // Hide it
        $('#howtoplayScreen').attr('class', 'hidden');   // Hide it
        $('#message').hide();
        $('#startScreen').show();
    });

    function setupLobby() {
    	$.get("/createroom/", function(data, status){
    		// TODO Add check for failure to create room
            code = data;
            $('#gameRoomCode').text(data);
    		$('#room_code').text('Room Code: ' + code);
			startWordCountInterval();
		});

    }

    function joinLobby() {
    	$('#gameRoomCode').text(code);
		$('#room_code').text('Room Code: ' + code);
		startWordCountInterval();
    }

    /***************************************************************************/
    /************************* LOBBY FUNCTIONS *********************************/
    /***************************************************************************/

    /*
     * Returns to the start screen from lobby
     */
    $(document).on('click', '#back_home_btn', function() {
        $('#lobby').attr('class', 'hidden');
        $('#startScreen').show();
    });

    /*
     * Processes the user submitted word and adds it to the database
     */
    $('#submit_word_btn').click(function () {
        var word = $('#submit_word_box').val().trim();
        var hasSpecialChar = /[\(\)~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

        if (word == '') {
            // Word cannot be blank
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word cannot be blank or spaces.');
        }
        else if (hasSpecialChar.test(word)) {
            // Word cannot contain special characters
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word cannot contain special characters.');
        }
        else if (word.length > 50) {
            // Word is too long - limit of 50 characters
            $('#lobby_message').attr('style', 'color:red');
            $('#lobby_message').text('Your word can be at most 30 characters long.');
        }
        else {

	        $.post("/addword/", {'word': word, 'code': code}, function(data, status){
	            if (data == "Success") {
	                // Clear the text box
	                $('#submit_word_box').val('');

	                // Display success message
	                $('#lobby_message').attr('style', 'color:green');
	                $('#lobby_message').text("Word submitted successfully!");

	                // Update contribution to room
	                words_contributed += 1;
	                $('#contribution').text('You have contributed ' + words_contributed + " word(s)");
	            }
	            else {
	                // Bad room code. Redirect user to home page
	                goHome();
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

        $.get("/getcount/" + code, function(data, status){

            if (data >= 5) {
                /*
            	 * Prompt before leaving lobby
            	 */
            	window.onbeforeunload = function() {
            		return 'Are you sure you want to leave?';
            	};

                // Begin the game
                clearInterval(word_count_interval);
                $('#lobby').hide();
                $('#gameScreen').attr('class', 'container');
                getWords();
            }
            else {
                $('#lobby_message').attr('style', 'color:red');
                $('#lobby_message').text('The word bank must have at least 5 words.');
    	        $("#lobby_message").show().delay(3000).fadeOut();
            }
        });
    });

    function getRoomCode() {
        var roomCode = $('#gameRoomCode').text();
    	return roomCode;
    }

    function startWordCountInterval() {
        /*
         * Run this function periodically to update the word count in the lobby
         */
        word_count_interval = setInterval(function() {

            $.get("/getcount/" + code, function(data, status){
                if (data == "Room no longer exists") {
                    goHome();
                }
                else {
                    $('#word_count').text("Word Bank Count: " + data);
                }
            });

        }, 500);
    }

    /***************************************************************************/
    /************************* GAME FUNCTIONS **********************************/
    /***************************************************************************/

    function getWords() {
    	$.get("/getwords/" + code, function(data, status){
    		words = data.split(",");
    		num_words = words.length;
    		shuffle(words);
    		updateWordsRemaining();
    	});
    }

	/*
	 * Begins the game, starting with Team 1
	 */
	$('#begin_btn').click(function () {
		if (num_words > 0) {
			$('#begin').hide();
			$('#gameplay').attr('class', 'container');    // Make it visible

			showCurrentWord();

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
		showCurrentWord();
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
				$('#word').text("Round complete!");
				clearInterval(interval);
				updateRound();
			}
			else {
				showCurrentWord();
			}
		}

	});

	/*
	 * When play again is clicked, send user back to the home page
	 */
	$('#play_again').click(function () {
		goHome();
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
    	$('#turn').text("Team " + turn + " Turn");
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
    		shuffle(words);
    		num_words = words.length;
    		updateWordsRemaining();

    		// Show the begin button
    		$('#begin').show();
    		$('#gameplay').attr('class', 'hidden');    // Make it hidden

    		// Other team gets to go
    		switchTurns();


    	}
    	else {
    		$('#timer').hide();
    		$('#begin').hide();
    		$('#gameplay').attr('class', 'hidden');    // Make it hidden
    		$('#game_over').attr('class', 'container');

    		var winner;

    		if (team1score > team2score) winner = "Team 1 Wins!";
    		else if (team2score > team1score) winner = "Team 2 Wins!";
    		else winner = "Tie Game!";

    		$('#game_over_message').text(winner);
    		window.onbeforeunload = null;
    	}
    }

    /*
     * Update the word count remaining on the screen
     */
    function updateWordsRemaining() {
    	$('#words_remaining').text("Words remaining: " + num_words);
    }

    /*
     * Get next word from the word bank and display it to the user
     */
    function showCurrentWord() {
    	$('#word').text(words[counter]);

    	clearInterval(display);	// Stop the word fadeout timer

    	$('#word_display').show();

    	display = setTimeout(function(){
    		$('#word_display').fadeOut();
    	}, 2000);
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

});