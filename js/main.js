$(document).ready(function() {
    var seconds = 1;
    var timer;
    var menuPath = "images/menu/";
    var events = [];
    var board = document.querySelector("table");
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

  // check to see if value has already been pulled form array
  function compare(num, array){
    if(array.indexOf(num) > -1) {
      var num2 = images[Math.floor(Math.random() * images.length)];
      compare(num2, array);
    } else {
      array.push(num);
    }
  }

  function setImages(num){
    var i = 0;
    while(i < num.grid/2){
      var rand = images[Math.floor(Math.random() * images.length)];
      compare(rand, gameSquares.all);
      i++;
    }
  }

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
    setImages(size);
    var tempArray = gameSquares.all;
    console.log(tempArray);
    // console.log(gameSquares.all);
    // console.log(gameSquares.shuffled);
    gameSquares.shuffled = shuffle(tempArray);
    console.log(gameSquares.shuffled);
    console.log(gameSquares.all);
  }

  makeBoard(level[1]);
  //perform action on clicked square
  board.addEventListener("click", timerClickEvent);

  $("table").on("click", function(){
    var target = $(event.target);
    target.addClass('flipped').css('background-image', "url(" + checkSquareID(target) + ")");
    // console.log(target);
    events.push(target);
    checkSquareID(target);


    if (events.length === 2){

      setTimeout(function(){
        checkForMatch(events);
      }, 1500);
    }
    endGame();

  });



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
      reset(allCells);
    }
  }

  function reset(cells){
    alert("You win");
    cells.removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
    clearInterval(timer);
    seconds = 0;
    $("h1").text("Game Time: 0");
    board.addEventListener("click", timerClickEvent);
  }

  function checkSquareID(eventObject){
    var id = $(eventObject).attr('id') - 1;
    console.log(id);
    if (id < level[1].grid/2){
      console.log(gameSquares.all[id]);
      return gameSquares.all[id];
    }else{
      console.log(gameSquares.shuffled[id-level[1].grid/2]);
      return gameSquares.shuffled[id-level[1].grid/2];
    }
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

  function shuffle(array) {
   var j, k;
   var temp;
   for (j = 0; j < array.length; j++) {
     k = Math.floor(Math.random() * array.length);
     temp = array[j];
     array[j] = array[k];
     array[k] = temp;
   }
   console.log("I was done");
   return array;
}


});
