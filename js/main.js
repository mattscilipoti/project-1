$(document).ready(function() {
    var seconds = 0;
    var timer;
    var menuPath = "images/menu/";
    var events = [];
    var board = document.querySelector("table");
    var gameSquares = {
      all : [menuPath + "Sandwich1.png", menuPath + "Burger2.png",menuPath + "Sandwich1.png", menuPath + "Burger2.png"],
      defaultSquare : "images/McDonalds_golden_arch.png"
    } ;

    var level = [{
      row: 2,
      col: 2
    },{
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
    }
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

      setTimeout(function(){
        checkForMatch(events);
      }, 1500);
    }
    endGame();

  });


  board.addEventListener("click", timerClickEvent);

  var updateTimer = function () {
    $("h1").text('Game Time: ' + seconds);
    seconds++;
  };

  function timerClickEvent(){
    timer = setInterval(updateTimer, 1000);
    board.removeEventListener("click", timerClickEvent);
  }

  function endGame(){
    var allCells = $("td");
    if(!$("td").not(".flipped").length) {
      alert("You win");
      allCells.removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      clearInterval(timer)
      seconds = 0;
      $("h1").text("Game Time: 0")
      board.addEventListener("click", timerClickEvent);


    }

  }

  function checkSquareID(eventObject){
    var id = $(eventObject).attr('id') - 1;
    return gameSquares.all[id];
  }

  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-image") === eventsArray[1].css("background-image")){
      events = [];

    } else {
      console.log("not matching");
      eventsArray[0].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      eventsArray[1].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
      events = [];
    }
  }


});
