/* global $ */

$(document).ready(function() {

    $('#new_game_btn').click(function () {
        window.location.href = "https://bigbowl.herokuapp.com/lobby/newgame";
    });
    
    $('#add_words_btn').click(function () {
        hideStartScreen();

        var joinScreen = document.querySelector('#joinScreen');
        var content = document.importNode(joinScreen.content, true);
        document.body.appendChild(content);
    });
    
    


});

function hideStartScreen() {
    $('#startScreen').hide();
    $('#credits').hide();
}

function showStartScreen() {
    $('#startScreen').show();
    $('#credits').show();
}