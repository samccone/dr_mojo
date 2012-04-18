function Board(x,y) {
  this.board = [];
  this.width = x;
  this.height = y;
  for( var i = 0; i < x ; ++i) {
    this.board[i] = [];
  }
}

Board.prototype.inBounds = function(x,y) {
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
}

Board.prototype.occupied = function(x,y) {
  return this.board[x][y];
}

Board.prototype.printBoard = function() {
  console.log(this.board)
}

Board.prototype.eraseSpot = function(x, y) {
  ctx.clearRect(x * block_size, y * block_size, block_size, block_size);
  this.board[x][y] = undefined;
}