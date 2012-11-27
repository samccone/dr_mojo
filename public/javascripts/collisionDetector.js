function CollisionDetector(board) {
  this.board = board;
}

CollisionDetector.prototype.canMove = function(position, pill) {
  var canMove = true;
  for( var i = 0; i < 2 && canMove; ++i ){
    if(position[i]){
      canMove = this.board.inBounds(position[i].x, position[i].y);
      if( canMove ) {
        var spot = this.board.occupied(position[i].x, position[i].y,1);
        if(!spot || spot.pill !== pill){
            canMove = this.checkSpot(position[i].x, position[i].y);
        }
      }
    }
  }
  return canMove;
}

CollisionDetector.prototype.checkSpot = function(x, y) {
  return !this.board.occupied(x, y);
}