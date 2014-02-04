
var params = [], hash;
var q = document.URL.split('?')[1];
if(q != undefined){
  q = q.split('&');
  for(var i = 0; i < q.length; i++){
      hash = q[i].split('=');
      params.push(hash[1]);
      params[hash[0]] = hash[1];
  }
}

var canvas = document.getElementById('game');
var ctx = canvas && canvas.getContext('2d');
var colors = ["green", "red", "blue"];
var block_size = 35;
var the_game;
var board_size = [8, 16];
var level = params['level'] || 0;
var speed = params['speed'] || 'Low';
var song = params['music'] || 'fever';

if (canvas) {
  canvas.setAttribute('width', board_size[0] * block_size + "px");
  canvas.setAttribute('height', board_size[1] * block_size + "px");

  var holder = document.getElementById('hold');
  var oracle_canvas = document.createElement('canvas');
  oracle_canvas.id = 'oracle'
  holder.appendChild(oracle_canvas);
  var oracle_ctx = oracle.getContext('2d');

  window.onload = function() {
    Sound.init();
    Sound.musicSet(song);
    the_game = new Game(level, speed, song);
    the_game.start();

    $('.next-level-button').bind('click', function () {
      $('#nextLevelModal').trigger('reveal:close');
      the_game.paused = false;
    });

    $('.restart-button').on('click', function (e) {
      e.preventDefault();
      the_game.restart();
    });
  }
}

window.app = {
  models: {}
}