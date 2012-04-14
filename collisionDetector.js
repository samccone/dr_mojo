function CollisionDetector(board) {
  this.board = board;
}

CollisionDetector.prototype.canMove = function(position) {
  var canMove = true;
  for( var i = 0; i < 2 && canMove; ++i ){
    canMove = this.inBounds(position[i].x, position[i].y);
    if( canMove ) {
      canMove = this.checkSpot(position[i].x, position[i].y);
    }
  }
  return canMove;
}

CollisionDetector.prototype.inBounds = function(x, y) {
  return ( x >= 0 && x < this.board.width && y < this.board.height );
}

CollisionDetector.prototype.checkSpot = function(x, y) {
  return !this.board.occupied(x, y);
}