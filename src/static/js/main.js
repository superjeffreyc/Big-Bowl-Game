/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"

$(document).ready(function() {

    $('#new_game_btn').click(function () {
        window.location.href = homeURL + "/lobby/newgame";
    });
    
    $('#add_words_btn').click(function () {
        hideStartScreen();

        var joinScreen = document.querySelector('#joinScreen');
        var content = document.importNode(joinScreen.content, true);
        $('#mainScreen').append(content);
    });

    $(document).on('click', '#submit_room_code_btn', function() {
        var code = $('#room_code_box').val().trim();
        code = code.toLowerCase();
        
        if (code.length == 6) {
            $.get("http://big-bowl-game-jchan63.c9users.io:8080/search/" + code, function(data, status){
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
    
    $(document).on('click', '#back_home_btn', function() {
        window.location.href = homeURL;
    });
    
});
    
function hideStartScreen() {
    $('#startScreen').hide();
}

function showStartScreen() {
    $('#startScreen').show();
}