/* global $ */

var homeURL = "http://big-bowl-game-jchan63.c9users.io:8080/"

$(document).ready(function() {

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

