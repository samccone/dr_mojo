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

Board.prototype.occupied = function(x,y) {
  if (this.board[x][y]) {
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

Board.prototype.matches = function(){
  var minMatchLength = 4;
  var theMatches = [];
  var last;
  var matches = [];
  var reset = false;
  var axis = [this.width, this.height];
  for( var k = 0; k < 2; ++k){
    for( var i = 0; i < axis[k]; ++i){
      for( var j = 0, matches = [], last = undefined, reset = false; j < axis[(k+1)%2]; ++j){
        var _i = k == 0 ? i : j;
        var _j = k == 0 ? j : i;
        if(last) {
          reset = this.occupied(_i,_j) && last == this.board[_i][_j].color && matches.push({x: _i, y: _j}) ? false : true;
        }
        if (!last || reset){
          matches.length >= minMatchLength && theMatches.push(matches);
          last = this.occupied(_i,_j);
          matches = last ? [{x: _i, y: _j}] : [];
        }
      }
      matches.length >= minMatchLength && theMatches.push(matches);
    }
  }
  return theMatches;
}