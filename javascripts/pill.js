function Pill(board, detector, position, _colors) {
  this.type = "pill";
  this.detector = detector;
  this.board = board;
  this.position = position || [{
    x: Math.floor(this.board.width / 2) - 1,
    y: 0
  }, {
    x: Math.floor(this.board.width / 2),
    y: 0
  }];
  this.colors = _colors || [colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]];
  this.collision = false;
  this.rotationState = 0;
  this.updatePosition();
  this.draw();
}

Pill.prototype.draw = function() {
  for (var i = 0; i < this.colors.length; ++i) {
    var piece_rotation = (this.rotationState + 2 * i) % 4;
    this.position[i] && this.colors[i] && PieceDrawer.drawPiece(this.position[i].x, this.position[i].y, this.colors[i], piece_rotation);
  }
}

Pill.prototype.erase = function() {
  for (var i = 0; i < this.position.length; ++i) {
    this.position[i] && this.board.eraseSpot(this.position[i].x, this.position[i].y);
  }
}

Pill.prototype.rotateLeft = function() {
  this.rotate((4+this.rotationState + 1) % 4);
}

Pill.prototype.rotateRight = function() {
  this.rotate((4+this.rotationState - 1) % 4);
}

Pill.prototype.clonePosition = function() {
  var clone = [];
  for (var i = 0; i < this.position.length; ++i) {
    clone.push({});
    for (var k in this.position[i]) {
      clone[i][k] = this.position[i][k];
    }
  }
  return clone;
}

Pill.prototype.rotate = function(to) {
  var pos = this.clonePosition();
  var offset_x = 0;
  switch(to) {
    case 1:
      pos[1].x = pos[0].x;
      pos[1].y = pos[0].y + 1;
    break;
    case 2:
      offset_x = 1;
      pos[1].x = pos[0].x -1;
      pos[1].y = pos[0].y;
    break;
    case 3:
      pos[1].x = pos[0].x;
      pos[1].y = pos[0].y - 1;
    break;
    case 0:
      offset_x = -1
      pos[1].x = pos[0].x + 1;
      pos[1].y = pos[0].y;
    break;
  }
  if ( !this.move(pos, to) && offset_x ){
    //Try again with the x offset
    pos[0].x = pos[0].x + offset_x;
    pos[1].x = pos[1].x + offset_x;
    this.move(pos, to)
  }
}

Pill.prototype.isEmpty = function() {
  return !(Boolean(this.colors[0]) || Boolean(this.colors[1]));
}

Pill.prototype.move = function(pos, rotation_state) {
  this.erase();
  var canMove = this.detector.canMove(pos);
  this.collision = !canMove;
  if (canMove) {
    if (typeof(rotation_state) != 'undefined') {
      this.rotationState = rotation_state
    }
    for (var i = 0; i < this.position.length; ++i) {
      if (this.position[i]) {
        this.position[i].x = pos[i].x;
        this.position[i].y = pos[i].y;
      }
    }
  }
  this.draw();
  this.updatePosition();
  return canMove;
}

Pill.prototype.moveRight = function() {
  var toMove = []
  for (var i = 0; i < this.position.length; ++i) {
    if (this.position[i]) {
      toMove.push({
        x: this.position[i].x + 1,
        y: this.position[i].y
      });
    } else {
      toMove.push(undefined);
    }
  }
  return this.move(toMove);
}

Pill.prototype.moveDown = function() {
  var toMove = []
  for (var i = 0; i < this.position.length; ++i) {
    if (this.position[i]) {
      toMove.push({
        x: this.position[i].x,
        y: this.position[i].y + 1
      });
    } else {
      toMove.push(undefined);
    }
  }
  return this.move(toMove);
}


Pill.prototype.moveLeft = function() {
  var toMove = []
  for (var i = 0; i < this.position.length; ++i) {
    if (this.position[i]) {
      toMove.push({
        x: this.position[i].x - 1,
        y: this.position[i].y
      });
    } else {
      toMove.push(undefined);
    }
  }
  return this.move(toMove);
}

Pill.prototype.updatePosition = function() {
  for (var i = 0; i < this.position.length; ++i) {
    if (this.position[i]) {
      this.board.board[this.position[i].x][this.position[i].y] = {
        pos: i,
        pill: this
      };
    }
  }
}
