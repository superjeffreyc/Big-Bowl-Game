/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"

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
    
});