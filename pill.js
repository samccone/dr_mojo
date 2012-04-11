function Pill() {
  this.position			=  { x : 0 , y : 0 };
  this.orientation	= 1; // 1 == horizontal ... 0 == vertial
  this.colors				=  [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.draw();
}

Pill.prototype.draw = function(){
  ctx.fillStyle = this.colors[0];
  ctx.fillRect(this.position.x * block_size , this.position.y * block_size, block_size, block_size);
  ctx.fillStyle = this.colors[1];
  ctx.fillRect(this.position.x * block_size + block_size, this.position.y * block_size, block_size, block_size);
}

Pill.prototype.moveRight = function() {
	if ( this.position.x + this.orientation < board[0].length ) {
		this.position.x++;
	}
	this.draw();
}

Pill.prototype.moveLeft = function() {

}