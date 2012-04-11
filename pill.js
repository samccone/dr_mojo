function Pill() {
  this.position			=  { x : 0 , y : 0 };
  this.orientation	= 2; // 2 == horizontal ... 1 == vertial
  this.colors				=  [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.draw();
}

Pill.prototype.draw = function(){
  ctx.fillStyle = this.colors[0];
  ctx.fillRect(this.position.x * block_size , this.position.y * block_size, block_size, block_size);
  ctx.fillStyle = this.colors[1];
  ctx.fillRect(this.position.x * block_size + block_size, this.position.y * block_size, block_size, block_size);
}

Pill.prototype.erase = function(){
	ctx.clearRect(this.position.x * block_size, this.position.y * block_size, block_size * this.orientation, 35);
}

Pill.prototype.moveRight = function() {
	if ( ( this.position.x + this.orientation ) < board[0] ) {
		this.erase();
		this.position.x += 1;
		this.draw();
	}
}

Pill.prototype.moveDown = function() {
	if ( this.position.y < board[1] - 1 ) {
		this.erase();
		this.position.y += 1;
		this.draw();
	}
}


Pill.prototype.moveLeft = function() {
	if ( ( this.position.x ) > 0 ) {
		this.erase();
		this.position.x -= 1;
		this.draw();
	}
}