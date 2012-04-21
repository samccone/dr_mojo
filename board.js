function Board(width, height) {
  this.board = [];
  this.width = width;
  this.height = height;
  for( var i = 0; i < width ; ++i) {
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

Board.prototype.eachSpot = function(cb){
  for(var i = 0; i < this.width; ++i){
    for(var j = 0; j < this.height; ++j){
      cb(this.board[i][j],{x : i, y: j},this);
    }
  }
}