function Game() {
	this.board = new Board(board_size[0],board_size[1])
	this.setListeners();
}

Game.prototype.newPill = function() {
	return this.active_pill = new Pill(this.board);
}

Game.prototype.setListeners = function() {
	var _this = this;
	window.addEventListener('keydown', function(e){
		switch( e.keyCode ) {
			case 37:
				_this.active_pill.moveLeft();
			break;
			case 40:
				_this.active_pill.moveDown();
			break;
			case 39:
				_this.active_pill.moveRight();
			break;
		}
	});
}

Game.prototype.tick = function() {
	this.active_pill.moveDown();
	this.checkHit() && this.newPill();
}

Game.prototype.start = function(speed){
	var _this = this;
	this.newPill();
	this.game_speed = speed || parseInt(prompt("Game Speed?"), 10);
	this.clock = window.setInterval(function(){_this.tick()}, this.game_speed);
}

Game.prototype.checkHit = function(){
	if (this.active_pill.position.y  == this.board.height - 1 ) {
		return true;
	}
	return false;
}