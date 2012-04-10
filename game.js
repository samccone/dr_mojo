var canvas      = document.getElementById('game');
var ctx         = canvas.getContext('2d');
var board       = [8 , 16];
var colors      = ["green", "red" , "teal"];
var block_size  = 35;

canvas.setAttribute('width', board[0] * block_size + "px");
canvas.setAttribute('height', board[1] * block_size + "px");


function pill() {
  this.position =  { x : Math.floor(Math.random()*board[0]) , y : Math.floor(Math.random()*board[1])};
  this.colors   =  [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.draw();
}

pill.prototype.draw = function(){
  ctx.fillStyle = this.colors[0];
  ctx.fillRect(this.position.x * block_size , this.position.y * block_size, block_size, block_size);
  ctx.fillStyle = this.colors[1];
  ctx.fillRect(this.position.x * block_size + block_size, this.position.y * block_size, block_size, block_size);
}