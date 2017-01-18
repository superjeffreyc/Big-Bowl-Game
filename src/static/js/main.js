/* global $ */

$(document).ready(function() {

    $('#new_game_btn').click(function () {
        $('#startScreen').hide();
      
        var lobby = document.querySelector('#lobby');
        var content = document.importNode(lobby.content, true);
        document.body.appendChild(content);
    });
    
    $('#add_words_btn').click(function () {
        $('#startScreen').hide();
      
        var joinScreen = document.querySelector('#joinScreen');
        var content = document.importNode(joinScreen.content, true);
        document.body.appendChild(content);
    });


});