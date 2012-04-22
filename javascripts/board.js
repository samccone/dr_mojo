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
  var axis = [this.width, this.height];

  for( var i = 0; i < this.width; ++i){
    for( var j = 0; j < this.height; ++j){
      if(last){
        if(this.occupied(i,j) && last == this.board[i][j]){
          matches.push({x: i, y: j});
        } else {
        if( matches.length >= minMatchLength ){
          theMatches.push(matches);
        }
          matches = [];
        last = this.board[i][j];
        if(this.occupied(i,j)){
          matches = [{x: i, y: j}];
        }
        }
      } else {
        if( matches.length >= minMatchLength ){
          theMatches.push(matches);
        }
        last = this.board[i][j];
        if(this.occupied(i,j)){
          matches = [{x: i, y: j}];
        }
      }
    }
    if( matches.length >= minMatchLength ){
      theMatches.push(matches);
    }
    matches = [];
    last = undefined;
  }

    for( var j = 0; j < this.height; ++j){
    for( var i = 0; i < this.width; ++i){
      if(last){
        if(this.occupied(i,j) && last == this.board[i][j]){
          matches.push({x: i, y: j});
        } else {
        if( matches.length >= minMatchLength ){
          theMatches.push(matches);
        }
          last = this.board[i][j];
          if(this.occupied(i,j)){
            matches = [{x: i, y: j}];
          }
          matches = [];
        }
      } else {
        if( matches.length >= minMatchLength ){
          theMatches.push(matches);
        }
        last = this.board[i][j];
        if(this.occupied(i,j)){
          matches = [{x: i, y: j}];
        }
      }
    }
    if( matches.length >= minMatchLength ){
      theMatches.push(matches);
    }
    matches = [];
    last = undefined;
  }
  return theMatches;
}