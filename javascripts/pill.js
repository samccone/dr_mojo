function Pill(board, detector, position, _colors) {
  this.detector       = detector;
  this.board          = board;
  this.position			  = position || [ {x : 0 , y : 0 }, {x : 1 , y : 0 } ];
  this.colors         = _colors || [ colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)] ];
  this.collision      = false;
  this.rotationState  = 0;
  this.updatePosition();
  this.draw();
}

Pill.prototype.draw = function(){
  for( var i = 0; i < this.colors.length; ++i){
    PieceDrawer.drawPiece(this.position[i].x, this.position[i].y, this.colors[i]);
  }
}

Pill.prototype.erase = function(){
  for( var i = 0; i < this.position.length; ++i) {
    this.board.eraseSpot(this.position[i].x, this.position[i].y, block_size, block_size);
  }
}

Pill.prototype.rotateLeft = function() {
  this.rotate((this.rotationState + 1)%4);
}

Pill.prototype.rotateRight = function() {
  this.rotate((this.rotationState - 1)%4);
}

Pill.prototype.clonePosition = function(){
  var clone = [];
  for( var i = 0; i < this.position.length; ++i ){
    clone.push({});
    for ( var k in this.position[i] ) {
      clone[i][k] = this.position[i][k];
    }
  }
  return clone;
}

Pill.prototype.rotate = function(to){
  var pos = this.clonePosition();
  switch(to) {
    case -3:
    case 1:
      pos[1].x = pos[0].x;
      pos[1].y = pos[0].y + 1;
    break;
    case -2:
    case 2:
      pos[1].x = pos[0].x -1;
      pos[1].y = pos[0].y;
    break;
    case -1:
    case 3:
      pos[1].x = pos[0].x;
      pos[1].y = pos[0].y - 1;
    break;
    case 0:
      pos[1].x = pos[0].x + 1;
      pos[1].y = pos[0].y;
    break;
  }
  if(this.move(pos)) {
    this.rotationState = to;
  }
}

Pill.prototype.move = function(pos, down) {
  this.erase();
  var canMove = this.detector.canMove(pos);
  if(canMove) {
    this.position[0].x = pos[0].x;
    this.position[1].x = pos[1].x;
    this.position[0].y = pos[0].y;
    this.position[1].y = pos[1].y;
  } else if (down){
    this.collision = true;
  }
  this.draw();
  this.updatePosition();
  return canMove;
}

Pill.prototype.moveRight = function() {
  this.move([{
              x : this.position[0].x + 1,
              y : this.position[0].y
            },{
              x : this.position[1].x + 1,
              y : this.position[1].y
            }]);
}

Pill.prototype.moveDown = function() {
  this.move([{
              x : this.position[0].x,
              y : this.position[0].y + 1
            },{
              x : this.position[1].x,
              y : this.position[1].y + 1
            }], true);
}


Pill.prototype.moveLeft = function() {
  this.move([{
              x : this.position[0].x - 1,
              y : this.position[0].y
            },{
              x : this.position[1].x - 1,
              y : this.position[1].y
            }]);
}

Pill.prototype.updatePosition = function(last,lastWidth){
  this.board.board[this.position[0].x][this.position[0].y] = {color: this.colors[0], position: this.position[0], connected: this.position[1]};
  this.board.board[this.position[1].x][this.position[1].y] = {color: this.colors[1], position: this.position[1], connected: this.position[0]};
}