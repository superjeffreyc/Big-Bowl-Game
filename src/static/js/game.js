/* global $ */

var homeURL = "https://bigbowl.herokuapp.com/"

$(document).ready(function() {

    /*
     * Prompt before leaving lobby
     */
    $(window).bind('beforeunload', function(){
      return 'Are you sure you want to leave?';
    });
});

