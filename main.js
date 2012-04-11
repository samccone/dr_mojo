var canvas      = document.getElementById('game');
var ctx         = canvas.getContext('2d');
var board_size  = [8,16];
var board       = new Array(board_size[0]);
for (var i =0; i< board.length; ++i) {
	board[i] = new Array(board_size[1]);
}

var colors      = ["green", "red" , "teal"];
var block_size  = 35;
var the_game;

canvas.setAttribute('width', board_size[0] * block_size + "px");
canvas.setAttribute('height', board_size[1] * block_size + "px");

window.onload = function(){
	the_game = new Game();
}