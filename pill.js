function Pill(board,detector) {
  this.detector     = detector;
  this.board        = board;
  this.position			= [ {x : 0 , y : 0 }, {x : 1 , y : 0 } ];
  this.lastPosition = this.position;
  this.width				= 2;
  this.height				= 1;
  this.colors				= [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.board.board[this.position[0].x][this.position[0].y] = this.colors[0];
  this.board.board[this.position[1].x][this.position[1].y] = this.colors[1];
  this.draw();
  this.collision = false;
}

Pill.prototype.draw = function(){
  ctx.fillStyle = this.colors[0];
  ctx.fillRect(this.position[0].x * block_size , this.position[0].y * block_size, block_size, block_size);
  ctx.fillStyle = this.colors[1];
  ctx.fillRect(this.position[1].x * block_size, this.position[1].y * block_size, block_size, block_size);
}

Pill.prototype.erase = function(){
	ctx.clearRect(this.position[0].x * block_size, this.position[0].y * block_size, block_size, block_size);
  ctx.clearRect(this.position[1].x * block_size, this.position[1].y * block_size, block_size, block_size);

  this.board.board[this.position[0].x][this.position[0].y] = undefined;
  this.board.board[this.position[1].x][this.position[1].y] = undefined;
}

Pill.prototype.rotateLeft = function() {
}

Pill.prototype.rotateRight = function() {

}

Pill.prototype.moveRight = function() {
  this.erase();
  var canMove = this.detector.canMove([{
                  x : this.position[0].x + 1,
                  y : this.position[0].y
                },{
                  x : this.position[1].x + 1,
                  y : this.position[1].y
                }]);
	if(canMove) {
    this.position[0].x += 1;
    this.position[1].x += 1;
  }
  this.draw();
  this.updatePosition();
}

Pill.prototype.moveDown = function() {
  this.erase();
  var canMove = this.detector.canMove([{
                  x : this.position[0].x,
                  y : this.position[0].y + 1
                },{
                  x : this.position[1].x,
                  y : this.position[1].y + 1
                }]);
  if(canMove) {
  	this.position[0].y += 1;
    this.position[1].y += 1;
  } else {
    this.collision = true;
  }
  this.draw();
  this.updatePosition();
}


Pill.prototype.moveLeft = function() {
  this.erase();
  var canMove = this.detector.canMove([{
                  x : this.position[0].x - 1,
                  y : this.position[0].y
                },{
                  x : this.position[1].x - 1,
                  y : this.position[1].y
                }]);
  if(canMove) {
    this.position[0].x -= 1;
    this.position[1].x -= 1;
  }
  this.draw();
  this.updatePosition();
}

Pill.prototype.updatePosition = function(last,lastWidth){
  this.board.board[this.position[0].x][this.position[0].y] = this.colors[0];
  this.board.board[this.position[1].x][this.position[1].y] = this.colors[1];
}