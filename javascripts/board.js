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
    return this.board[x][y].color;
  }
  return this.board[x][y];
}

Board.prototype.printBoard = function() {
  console.log(this.board)
}

Board.prototype.eraseSpot = function(x, y) {
  if(ctx){
    ctx.clearRect(x * block_size, y * block_size, block_size, block_size);
  }
  this.board[x][y] = undefined;
}

Board.prototype.eachSpot = function(cb){
  for(var i = 0; i < this.width; ++i){
    for(var j = 0; j < this.height; ++j){
      cb(this.board[i][j],{x : i, y: j},this);
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
    if(spot && loc.y < b.height - 1 && !b.occupied(loc.x, loc.y + 1)){
      var con = spot.connected;
      if(!con){
        dangling.push(b.occupied(loc.x,loc.y,1));
      }
      if(con && con.y < b.height - 1 && !b.occupied(con.x, con.y + 1)) {
        dangling.push(b.occupied(loc.x,loc.y,1));
      }
    }
  });
  return dangling
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
            color = point ? point.color : null,
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