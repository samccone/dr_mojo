function Game() {
	this.board = new Board(board_size[0],board_size[1]);
	this.detector = new CollisionDetector(this.board);
	this.setListeners();
	this.paused = false;
	this.done = false;
}

Game.prototype.newPill = function() {
	return this.active_pill = new Pill(this.board, this.detector);
}

Game.prototype.gameOver = function() {
  this.done = true;
  this.clock = window.clearInterval(this.clock);
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
	if( !this.paused && !this.done) {
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
		//Change this to where the pills are created
		if(this.board.occupied(0,0)){
		  this.gameOver();
		}else{
		  this.newPill();
		}
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
	this.findDangling();
}

Game.prototype.findDangling = function(){
	var dangling = [];
	this.board.eachSpot(function(piece,loc, board){
		if( board.inBounds(loc.x, loc.y + 1) &&
				board.occupied(loc.x, loc.y) &&
				!board.occupied(loc.x, loc.y + 1)
				){
					dangling.push(loc);
			}
	});
	if(dangling.length){
		for(var i = 0; i < dangling.length; ++i){
			var color = this.board.occupied(dangling[i].x, dangling[i].y);
			this.board.eraseSpot(dangling[i].x, dangling[i].y);
			ctx.fillStyle = color;
	    ctx.fillRect(dangling[i].x * block_size , ( dangling[i].y + 1 ) * block_size, block_size, block_size);
			this.board.board[dangling[i].x][dangling[i].y + 1] = color;
		}
			this.findDangling();
			this.findMatches();
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