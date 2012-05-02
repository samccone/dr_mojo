function Virus(board, detector, level, randColor) {
  this.type       = 'Virus';
  this.board      = board;
  this.detector   = detector;
  this.level      = level;
  this.maxY       = undefined;
  this.color      = undefined;
  this.colors     = [this.color]; // for compatibility with Pill object
  this.position   = {x : undefined, y : undefined};

  this.setColor(randColor);
  this.setMaxBounds();
  this.setPosition();
  this.draw();
}

Virus.prototype.setColor = function(randColor) {
  if (randColor < 4) {
    this.color = colors[randColor];
  } else {
    this.color = colors[Math.floor( Math.random()*colors.length )];
  }
}

Virus.prototype.setMaxBounds = function() {
  if (this.level <= 4 ) { this.maxY = 6; }
  else if (this.level <= 8) { this.maxY = 7; }
  else if (this.level <= 12 ) { this.maxY = 8; }
  else if (this.level <= 16 ) { this.maxY = 9; }
  else { this.maxY = 10; }
}

Virus.prototype.setPosition = function() {
  var randX = Math.floor(Math.random() * this.board.width);
  var randY = Math.floor(Math.random() * this.maxY);
  this.position.x = randX;
  this.position.y = randY;

  if (this.board.occupied(randX, randY) === undefined) {
    this.board.addPiece(this, 0);
  } else {
    this.setPosition();
  }
}

Virus.prototype.draw = function() {
  this.position.x && this.position.y && this.color && PieceDrawer.drawVirus(this.position, this.color);
}
