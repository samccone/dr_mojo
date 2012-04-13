function Pill(board) {
  this.board        = board;
  this.position			= { x : 0 , y : 0 };
  this.lastPosition = this.position;
  this.width				= 2;
  this.height				= 1;
  this.colors				= [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.board.board[this.position.x][this.position.y] = this.colors[0];
  this.board.board[this.position.x + 1][this.position.y] = this.colors[1];
  this.draw();
}

Pill.prototype.draw = function(){
  ctx.fillStyle = this.colors[0];
  ctx.fillRect(this.position.x * block_size , this.position.y * block_size, block_size, block_size);
  ctx.fillStyle = this.colors[1];
  ctx.fillRect(this.position.x * block_size + block_size, this.position.y * block_size, block_size, block_size);
}

Pill.prototype.erase = function(){
	ctx.clearRect(this.position.x * block_size, this.position.y * block_size, block_size * this.width, block_size * this.height);
  this.board.board[this.position.x][this.position.y] = undefined;
  this.board.board[this.position.x + 1][this.position.y] = undefined;
}

Pill.prototype.moveRight = function() {
	if ( ( this.position.x + this.width ) < this.board.width ) {
		this.erase();
		this.position.x += 1;
		this.draw();
    this.updatePosition();
	}
}

Pill.prototype.moveDown = function() {
	if ( this.position.y + this.height < this.board.height ) {
		this.erase();
		this.position.y += 1;
		this.draw();
    this.updatePosition();
	}
}


Pill.prototype.moveLeft = function() {
	if ( ( this.position.x ) > 0 ) {
		this.erase();
		this.position.x -= 1;
		this.draw();
    this.updatePosition();
	}
}

Pill.prototype.updatePosition = function(last,lastWidth){
  this.board.board[this.position.x][this.position.y] = this.colors[0];
  this.board.board[this.position.x + 1][this.position.y] = this.colors[1];
}