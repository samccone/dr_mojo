var canvas      = document.getElementById('game');
var ctx         = canvas.getContext('2d');
var colors      = ["green", "red" , "teal"];
var block_size  = 35;
var the_game;
var board_size  = [8,16];

canvas.setAttribute('width', board_size[0] * block_size + "px");
canvas.setAttribute('height', board_size[1] * block_size + "px");

window.onload = function(){
	the_game = new Game();
  the_game.start(300);
}