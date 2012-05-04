function Board(width, height) {
  this.board = new Array(width);
  this.width = width;
  this.height = height;
  for( var i = 0; i < width ; ++i) {
    this.board[i] = new Array(height);
  }
}

Board.prototype.inBounds = function(x,y) {
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
}

Board.prototype.occupied = function(x,y,full) {
  if (this.board[x][y]) {
    if(full) {
      return this.board[x][y];
    }
    return this.board[x][y].color || this.board[x][y].pill.colors[this.board[x][y].pos];
  }
  return this.board[x][y];
}

/*
 * Expecting either a Pill or Virus as obj
 * - Pill and Virus must have a position attribute that is a hash like
 *   {x:0, y:0}
 *
 *  Returns true if object was added to board, false if it wasnt because
 *  location was already occupied
 */
Board.prototype.addPiece = function(obj, obj_pos) {
  if (this.occupied(obj.position.x, obj.position.y) === undefined) {
    this.board[obj.position.x][obj.position.y] = {pill : obj, pos : obj_pos};
    return true;
  } else {
    return false;
  }
}

Board.prototype.printBoard = function() {
  console.log(this.board)
}

Board.prototype.eraseSpot = function(x, y, fullDelete) {
  if(ctx){
    ctx.clearRect(x * block_size, y * block_size, block_size, block_size);
  }
  if(fullDelete){
    var piece = this.board[x][y];
    if(piece && piece.pill){
      piece.pill.colors[piece.pos] = undefined;
      piece.pill.position[piece.pos] = undefined;
    }
  }
  this.board[x][y] = undefined;
}

Board.prototype.eachSpot = function(cb){
  for(var i = 0; i < this.width; ++i){
    for(var j = 0; j < this.height; ++j){
      cb(this.occupied(i,j,1),{x : i, y: j},this);
    }
  }
}

Board.prototype.clearAll = function(){
  this.eachSpot(function(target,coords,board){
    board.eraseSpot(coords.x, coords.y);
  });
}

Board.prototype.dangling = function(){
  var dangling = [];
  this.eachSpot(function(spot,loc,b){
    if(spot && spot.pill.type != "Virus"){
      var detector = spot.pill.detector;
      var toMove = []
      for(var i = 0; i < spot.pill.position.length; ++i){
        if(spot.pill.position[i]){
          toMove.push({
            x : spot.pill.position[i].x,
            y : spot.pill.position[i].y + 1
          });
        } else {
          toMove.push(undefined);
        }
      }
      if(detector.canMove(toMove, spot.pill)){
        dangling.push(spot);
      }
    }
  });
  return dangling;
}

Board.prototype.matches = function(){
  var minMatchLength = 4;
  var result = [];
  var axis = [this.width, this.height];

  for (var k=0; k<2; ++k) {
    for (var i=0; i<axis[k]; ++i) {
      var r = [];
      for (var j=0; j<axis[1-k]; ++j) {
        var x = k ? j : i,
            y = k ? i : j,
            point = this.board[x][y],
            color = point ? point.pill.colors[point.pos] : null,
            last = _.last(r),
            c = { x: x, y: y};
        last && last.color == color ? last.points.push(c) : r.push({color: color, points: [c]});
      }
      var selected = _.filter(r, function(p) { return p.color && p.points.length >= minMatchLength; });
      result = _.union(result, _.pluck(selected, 'points'));
    }
  }

  return result;
};
