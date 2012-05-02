function Virus(game, level, virusNum) {
  this.type       = 'Virus';
  this.virusNum   = virusNum;
  this.game		  = game;
  this.board      = game.board;
  this.detector   = game.detector;
  this.level      = level;
  this.maxY       = undefined;
  this.color      = undefined;
  this.colors     = undefined; // for compatibility with Pill object
  this.position   = {x : undefined, y : undefined};

  this.setColor();
  this.setMaxBounds();
  this.setPosition();
}

Virus.prototype.setColor = function() {
  var randColor = this.virusNum;

  if (randColor < 3) {
    this.color = this.game.colors[randColor];
  } else {
    this.color = this.game.colors[Math.floor( Math.random()*this.game.colors.length )];
  }
  this.colors = [this.color];
}

Virus.prototype.setMaxBounds = function() {
  if (this.level <= 4 ) { this.maxY = 10; }
  else if (this.level <= 8) { this.maxY = 9; }
  else if (this.level <= 12 ) { this.maxY = 8; }
  else if (this.level <= 16 ) { this.maxY = 7; }
  else { this.maxY = 6; }
	// 
	// this.maxY=15;
}

Virus.prototype.setPosition = function() {
  var randX = Math.floor(Math.random() * this.board.width);
  var randY = Math.floor(Math.random() * 13) + 3;  // we dont ever put anything in the first 4 rows

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
