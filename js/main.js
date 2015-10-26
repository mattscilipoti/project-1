$(document).ready(function() {
  //create gameboard
  $("#gameboard").append('<table><tr id="row1" class="row"><td></td><td></td></tr><tr id="row2" class="row"><td></td><td></td></tr></table>');

  //perform action on clicked square
  $("table").on("click", function(){
    var target = $(event.target);
    target.addClass('flipped');
  });

});
