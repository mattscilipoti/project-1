$(document).ready(function() {
    var menuPath = "images/menu/";
    var i = 0;
    var events = [];
    var squaresMatch = false;
    var gameSquares = {
      all : [menuPath + "Sandwich1.png", menuPath + "Burger2.png"],
      defaultSquare : "images/McDonalds_golden_arch.png"
    } ;

console.log(gameSquares.defaultSquare);
  //create gameboard
  $("#gameboard").append('<table><tr id="row1" class="row"><td></td><td></td></tr><tr id="row2" class="row"><td></td><td></td></tr></table>');

  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-image") === eventsArray[1].css("background-image")){
      eventsArray[0].addClass('matching');
      eventsArray[1].addClass('matching');
      console.log(eventsArray[0]);

      squaresMatch = !squaresMatch;
    } else {
      console.log("not matching");
      eventsArray[0].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      eventsArray[1].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
    }
  }

  //perform action on clicked square
  $("table").on("click", function(){
    var target = $(event.target);

    target.addClass('flipped').css('background-image', "url(" + gameSquares.all[i] + ")");
    i++;
    events.push(target);
    console.log(i);

    if (events.length === 2){
      //check to see if they have a match
      console.log("I have two evnets");
      setTimeout(function(){
        checkForMatch(events);
      }, 1500);
      // if (squaresMatch){
      //   $("table").off();
      // }
    }

  });
});
