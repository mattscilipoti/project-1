$(document).ready(function() {
    var seconds = 0;
    var minutes = 0;
    var timer;
    var game = 0;
    var difficulty;
    var menuPath = "images/menu/";
    var events = [];
    var board = document.querySelector("table.main");
    var gameSquares = {
      all : [],
      shuffled : [],
      defaultSquare : "images/McDonalds_golden_arch.png"
    } ;

    var images = ["images/menu/Breakfast1.png", "images/menu/Breakfast2.png", "images/menu/Breakfast3.png", "images/menu/Burger1.png", "images/menu/Burger2.png", "images/menu/Burger3.png", "images/menu/Burger4.png", "images/menu/Coffee1.png", "images/menu/Coffee2.png", "images/menu/Drink1.png", "images/menu/Salad1.png", "images/menu/Sandwich1.png", "images/menu/Sandwich2.png", "images/menu/Sandwich3.png", "images/menu/Sandwich4.png", "images/menu/Side1.png", "images/menu/Side2.png", "images/menu/Side3.png"];

    var level = [{
      row: 2,
      col: 2,
      grid: 4
    },{
      row: 4,
      col: 4,
      grid: 16
    }, {
      row: 4,
      col: 5,
      grid: 20
    },{
      row: 5,
      col: 6,
      grid: 30
    },{
      row: 6,
      col: 6,
      grid: 36
    }
  ];

  // play again button
  $(".again").on("click", function(){
    // newGame();
    $(".results").fadeOut('fast');
  });

  // Show hide game rules
  $(".new").on("click", function(){
    gameRules();
    // newGame();
  });

  // gets difficulty level
  $(".menu button").on("click", function(){
    newGame();
  });

  function gameRules(){
    $(".intro").fadeToggle('fast');
  }

  function results(time){
    $(".stat-time").text(time);
    $(".results").fadeIn('slow');
  }

  // sets a new game
  function newGame(){
    $("table.main tr").remove();
    gameSquares.all = [];
    gameSquares.shuffled = [];
    setTimer();
    difficulty = $(event.target).attr("id");
    makeBoard(level[difficulty]);
  }

  // check to see if value has already been pulled form array
  function compare(num, array){
    if(array.all.indexOf(num) > -1) {
      var num2 = images[Math.floor(Math.random() * images.length)];
      compare(num2, array);
    } else {
      array.all.push(num);
      array.shuffled.push(num);
    }
  }

  function setImages(num){
    var i = 0;
    while(i < num.grid/2){
      var rand = images[Math.floor(Math.random() * images.length)];
      compare(rand, gameSquares);
      i++;
    }
  }

  //create gameboard
  function makeBoard(size){
    cellID = 1;
    for (var i = 0; i < size.row; i++) {
      $("table.main").append('<tr id="row' + (i+1) + '"></tr>');
      for (var j = 0; j < size.col; j++) {
        $("#row" + (i+1)).append('<td id="' + cellID + '"></td>');
        cellID++;
      }
    }
    setImages(size);
    gameSquares.shuffled = shuffle(gameSquares.shuffled);
  }

  //perform action on clicked square
  board.addEventListener("click", timerClickEvent);
  board.addEventListener("click", gameClickEventHandler);

  function gameClickEventHandler(){
    var target = $(event.target);
    console.log(target);
    if (target.attr("class") != "main"){
      target.addClass('flipped').css('background-image', "url(" + checkSquareID(target) + ")");
      events.push(target);
      checkSquareID(target);

      if (events.length === 2){
        board.removeEventListener("click", gameClickEventHandler);
        setTimeout(function(){ // delay to show flip actions
          var set = checkForMatch(events);
          if (set === true){
            events = [];
            board.addEventListener("click", gameClickEventHandler);
          } else {

              events[0].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
              events[1].removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
              events = [];

            board.addEventListener("click", gameClickEventHandler);
          }
        }, 700);
      }
      endGame();
    }
  }

  // updates game timer
  var updateTimer = function () {
    $("h1").text('Time: ' + minutes + ":" + seconds);
    seconds++;
    if (seconds % 60 === 0 ){
       minutes++;
       seconds = 0;
    }
  };

  function timerClickEvent(){
    timer = setInterval(updateTimer, 1000);
    board.removeEventListener("click", timerClickEvent);
  }

  // Determines when the game is over and resets the board
  function endGame(){
    var allCells = $("table.main td");
    if(!$("table.main td").not(".flipped").length) {
      reset(allCells);
    }
  }

  function reset(cells){
    scoreBoard();
    cells.removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
    $("table.main tr").remove();
    gameSquares.all = [];
    gameSquares.shuffled = [];
    setTimer();
  }

  function setTimer(){
    clearInterval(timer);
    seconds = 1;
    minutes = 0;
    $("h1").text("Time: 0:0");
    board.addEventListener("click", timerClickEvent);
  }

  function scoreBoard(){
    var timeTable = $(".slot");
    var endTime = minutes + ":" + (seconds-1);
    timeTable.eq(game).html(endTime);
    results(endTime);
    game++;
    if (game === 4) {game = 0;}

  }
  // gets the id of the click square and sets it bg image
  function checkSquareID(eventObject){
    var id = $(eventObject).attr('id') - 1;
    if (id < level[difficulty].grid/2){
      return gameSquares.all[id];
    }else{
      return gameSquares.shuffled[id-level[difficulty].grid/2];
    }
  }

  // checks bg-image for a match
  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-image") === eventsArray[1].css("background-image")){
      return true;
    } else {
      return false;
    }
  }

  //shuffles second image array
  function shuffle(array) {
   var j, k;
   var temp;
   for (j = 0; j < array.length; j++) {
     k = Math.floor(Math.random() * array.length);
     temp = array[j];
     array[j] = array[k];
     array[k] = temp;
   }
   return array;
}


});
