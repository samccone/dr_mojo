function Board(x,y) {
  this.board = [];
  this.width = x;
  this.height = y;
  for( var i = 0; i < x ; ++i) {
    this.board[i] = [];
  }
}

Board.prototype.occupied = function(x,y) {
  return this.board[x][y] != undefined
}

Board.prototype.printBoard = function() {
  console.log(this.board)
}