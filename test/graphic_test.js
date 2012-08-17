var canvas      = document.getElementById('game');
var ctx         = canvas && canvas.getContext('2d');
var colors      = ["green", "red" , "teal"];
var block_size  = 35;
var the_game;
var board_size  = [16,16];
var level = 4;


if(canvas){
  canvas.setAttribute('width', board_size[0] * block_size + "px");
  canvas.setAttribute('height', board_size[1] * block_size + "px");

  window.onload = function(){
    the_game = new Game();
    for (var row = 2; row < 16; row +=4){
      for (var column = 2; column < 16; column +=4){
        var direction = (row-2)/4
        var xdiff = Math.sin(direction*Math.PI/2)
        var ydiff = Math.cos(direction*Math.PI/2)
        new Pill(the_game.board, the_game.detector, [ {x : column, y : row}, {x : column+xdiff, y : row+ydiff} ]);
      }
    }
  }
}