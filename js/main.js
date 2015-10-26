$(document).ready(function() {
    var menuPath = "images/menu/";
    var events = [];
    var squaresMatch = false;
    var gameSquares = {
      all : [menuPath + "Sandwich1.png", menuPath + "Burger2.png",menuPath + "Sandwich1.png", menuPath + "Burger2.png"],
      defaultSquare : "images/McDonalds_golden_arch.png"
    } ;

    var level = [{
      row: 4,
      col: 4
    }, {
      row: 4,
      col: 5
    },{
      row: 5,
      col: 6
    },{
      row: 6,
      col: 6
    },{
      row: 4,
      col: 5
    },
  ];

  //create gameboard
  function makeBoard(size){
    cellID = 1;
    for (var i = 0; i < size.row; i++) {
      $("table").append('<tr id="row' + (i+1) + '"></tr>');
      for (var j = 0; j < size.col; j++) {
        $("#row" + (i+1)).append('<td id="' + cellID + '"></td>');
        cellID++;
      }
    }
  }

  makeBoard(level[0]);
  //perform action on clicked square
  $("table").on("click", function(){
    var target = $(event.target);
    target.addClass('flipped').css('background-image', "url(" + checkSquareID(target) + ")");
    events.push(target);
    checkSquareID(target);

    if (events.length === 2){
      //check to see if they have a match
      console.log("I have two evnets");
      setTimeout(function(){
        checkForMatch(events);
      }, 1500);
    }

  });

  function checkSquareID(eventObject){
    var id = $(eventObject).attr('id');
    return gameSquares.all[id];
  }

  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-image") === eventsArray[1].css("background-image")){
      eventsArray[0].addClass('matching');
      eventsArray[1].addClass('matching');
      events = [];
      squaresMatch = !squaresMatch;
    } else {
      console.log("not matching");
      eventsArray[0].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      eventsArray[1].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      events = [];
    }
  }


});
