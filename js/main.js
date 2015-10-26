$(document).ready(function() {
    var events = [];
    var squaresMatch = false;

  //create gameboard
  $("#gameboard").append('<table><tr id="row1" class="row"><td></td><td></td></tr><tr id="row2" class="row"><td></td><td></td></tr></table>');

  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-color") === eventsArray[1].css("background-color")){
      eventsArray[0].addClass('matching');
      eventsArray[1].addClass('matching');
      squaresMatch = !squaresMatch;
    } else {
      eventsArray[0].removeClass('matching');
      eventsArray[1].removeClass('matching');
    }
  }

  //perform action on clicked square
  $("table").on("click", function(){
    var target = $(event.target);
    target.addClass('flipped');
    events.push(target);

    if (events.length === 2){
      //check to see if they have a match
      checkForMatch(events);
      if (squaresMatch){
        $("table").off();
      }
    }

  });
});
