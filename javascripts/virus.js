function Virus(game, level, randColor) {
  this.type       = 'Virus';
  this.game		  = game;
  this.board      = game.board;
  this.detector   = game.detector;
  this.level      = level;
  this.maxY       = undefined;
  this.color      = undefined;
  this.colors     = undefined; // for compatibility with Pill object
  this.position   = {x : undefined, y : undefined};

  this.setColor(randColor);
  this.setMaxBounds();
  this.setPosition();
}

Virus.prototype.setColor = function(randColor) {
  if (randColor < 4) {
    this.color = this.game.colors[randColor];
  } else {
    this.color = this.game.colors[Math.floor( Math.random()*this.game.colors.length )];
  }
  this.colors = [this.color];
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

  if (this.board.occupied(randX, randY) === undefined) {
  	this.position.x = randX;
  	this.position.y = randY;
    this.board.addPiece(this, 0);
	this.draw();
  } else {
    this.setPosition();
  }
}

Virus.prototype.draw = function() {
  PieceDrawer.drawVirus(this.position, this.color);
}
