var canvas      = document.getElementById('game');
var ctx         = canvas && canvas.getContext('2d');
var colors      = ["green", "red" , "blue"];
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
        pill = new Pill(the_game.board, the_game.detector, [ {x : column -1  , y : row }, {x : column , y : row } ]);
        for (var i = 0; i < direction; i++){
          pill.rotateLeft();
        }
      }
    }
    for (var i = 1; i < 4; i++){
      virus = new Virus(the_game, level, i)
    }
    the_game.tick = function(){
      this.active_pill.rotateRight();
      this.active_pill.moveDown();
    }
    the_game.start(300);
  }
}