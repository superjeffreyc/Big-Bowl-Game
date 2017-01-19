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
    $('#add_words_btn').click(function () {
        hideStartScreen();

        var joinScreen = document.querySelector('#joinScreen');
        var content = document.importNode(joinScreen.content, true);
        $('#mainScreen').append(content);
    });

    /*
     * Processes the room code user input and checks to see if it actually exists
     */
    $(document).on('click', '#submit_room_code_btn', function() {
        var code = $('#room_code_box').val().trim();
        code = code.toLowerCase();
        
        if (code.length == 6) {
            $.get(homeURL + "search/" + code, function(data, status){
                if (data == "Found") {
                    window.location.href = homeURL + "lobby/" + code;
                }
                else {
                    $('#message').html(code + " not found")
                }
            });
        }
        else {
            $('#message').html("The room code must be 6 characters.")
        }
    });
    
    /*
     * Returns to the start screen
     */
    $(document).on('click', '#back_home_btn', function() {
        window.location.href = homeURL;
    });
    
});
    
/*
 * Hides start screen
 */
function hideStartScreen() {
    $('#startScreen').hide();
}

/*
 * Shows start screen
 */
function showStartScreen() {
    $('#startScreen').show();
}