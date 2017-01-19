/* global $ */

$(document).ready(function() {

    $('#new_game_btn').click(function () {
        window.location.href = "http://big-bowl-game-jchan63.c9users.io:8080/lobby/newgame";
    });
    
    $('#add_words_btn').click(function () {
        hideStartScreen();

        var joinScreen = document.querySelector('#joinScreen');
        var content = document.importNode(joinScreen.content, true);
        document.body.appendChild(content);
    });

    $(document).on('click', '#submit_room_code_btn', function() {
        var code = $('room_code_box').val();
        window.location.href = "http://big-bowl-game-jchan63.c9users.io:8080/lobby/" + code;
    });
});

// $("#joinScreen").click(function(){
    // showStartScreen();
    // var myTemplate = $("#testing").html().trim();
    // var myTemplateClone = $(myTemplate);
    // myTemplateClone.innerHTML = "HI";
    // var room = $('room_code_box').val();
    // document.getElementById("#joinScreen").innerHTML = "HI";
    // $.get("demo_test.asp", function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });
// });
    
function hideStartScreen() {
    $('#startScreen').hide();
    $('#credits').hide();
}

function showStartScreen() {
    $('#startScreen').show();
    $('#credits').show();
}