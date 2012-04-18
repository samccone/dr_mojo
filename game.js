function Game() {
	this.board = new Board(board_size[0],board_size[1]);
	this.detector = new CollisionDetector(this.board);
	this.setListeners();
	this.paused = false;
}

Game.prototype.newPill = function() {
	return this.active_pill = new Pill(this.board, this.detector);
}

Game.prototype.setListeners = function() {
	var _this = this;
	window.addEventListener('keydown', function(e){
		switch( e.keyCode ) {
			case 65: //a
				_this.pillAction('rotate-left');
				break;
			case 83: //s
				_this.pillAction('rotate-right');
				break;
			case 32:
				_this.togglePause();
				break;
			case 37:
				_this.pillAction('left');
				break;
			case 40:
				_this.pillAction('down');
				break;
			case 39:
				_this.pillAction('right');
				break;
		}
	});
}

Game.prototype.pillAction = function(action) {
	if( !this.paused ) {
		switch( action ) {
			case 'rotate-left' :
				this.active_pill.rotateLeft();
			break;
			case 'rotate-right' :
				this.active_pill.rotateRight();
			break;
			case 'left' :
				this.active_pill.moveLeft();
			break;
			case 'right' :
				this.active_pill.moveRight();
			break;
			case 'down' :
				this.active_pill.moveDown();
			break;
		}
	}
}

Game.prototype.togglePause = function(){
	this.paused = !this.paused;
}

Game.prototype.tick = function() {
	this.pillAction('down');
	if ( this.checkHit() ) {
		this.findMatches();
		this.newPill();
	}
}

Game.prototype.findMatches = function(){
	for( var k = 0; k < 2; ++k){
		for( var i = 0; i < this.active_pill.position.length; ++i) {
			var pos = this.active_pill.position[i];
			var inRow = [];
			var _l = k == 0 ? this.board.height: this.board.width;
			for( var j = 0; j < _l; ++j ) {
				var _x = k == 0 ? pos.x : j;
				var _y = k == 0 ? j : pos.y;
			if( this.board.inBounds(_x,_y) &&
					this.board.occupied(_x,_y) &&
					this.board.occupied(_x,_y) == this.active_pill.colors[i] ) {
					inRow.push({x: _x, y: _y});
				} else if (inRow.length < 4) {
						inRow = [];
				} else {
					for(var i=0; i<inRow.length; ++i){
						this.board.eraseSpot(inRow[i].x,inRow[i].y)
					}
				}
			}
			if( inRow.length > 3 ) {
				for(var i=0; i<inRow.length; ++i){
					this.board.eraseSpot(inRow[i].x,inRow[i].y)
				}
			}
		}
	}
}

Game.prototype.start = function(speed){
	var _this = this;
	this.newPill();
	this.game_speed = speed || parseInt(prompt("Game Speed?"), 10);
	this.clock = window.setInterval(function(){_this.tick()}, this.game_speed);
}

Game.prototype.checkHit = function(){
	return this.active_pill.collision;
}