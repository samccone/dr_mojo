var canvas = document.getElementById('game');
var ctx = canvas && canvas.getContext('2d');
var colors = ["green", "red", "blue"];
var block_size = 35;
var the_game;
var board_size = [8, 16];
var level = 0;
var speed = 'Low';

if (canvas) {
  canvas.setAttribute('width', board_size[0] * block_size + "px");
  canvas.setAttribute('height', board_size[1] * block_size + "px");

  var holder = document.getElementById('hold');
  var oracle_canvas = document.createElement('canvas');
  oracle_canvas.id = 'oracle'
  holder.appendChild(oracle_canvas);
  var oracle_ctx = oracle.getContext('2d');

  window.onload = function() {
    the_game = new Game(level, speed);
    the_game.start();
  }
}

window.app = {
  models: {}
};