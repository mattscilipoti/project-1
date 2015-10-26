$(document).ready(function() {
    var menuPath = "images/menu/";
    var events = [];
    var squaresMatch = false;
    var gameSquares = [menuPath + "Sandwich1.png", menuPath + "Burger2.png"];

  //create gameboard
  $("#gameboard").append('<table><tr id="row1" class="row"><td></td><td></td></tr><tr id="row2" class="row"><td></td><td></td></tr></table>');

  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-color") === eventsArray[1].css("background-color")){
      eventsArray[0].addClass('matching');
      eventsArray[1].addClass('matching').css('background-image', gameSquares[1]);

      squaresMatch = !squaresMatch;
    } else {
      console.log("not matching");
      eventsArray[0].removeClass('flipped');
      eventsArray[1].removeClass('flipped');
    }
  }

  //perform action on clicked square
  $("table").on("click", function(){
    var target = $(event.target);
    var i=0;
    target.addClass('flipped').css('background-image', "url(" + gameSquares[i] + ")");
    i++;
    events.push(target);

    if (events.length === 2){
      //check to see if they have a match
      console.log("I have two evnets");
      //checkForMatch(events);
      // if (squaresMatch){
      //   $("table").off();
      // }
    }

  });
});
