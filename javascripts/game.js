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
		this.findMatches(function(){
			//Change this to where the pills are created
			if(this.board.occupied(0,0)){
			  this.gameOver();
			}else{
			  this.newPill();
			}
		});
	}
}

Game.prototype.findMatches = function(cb){
	var cb = _.bind(cb,this);
	var matches = this.board.matches();
	if(matches.length){
		_.each(matches,function(match_set){
			_.each(match_set,function(spot){
				var deleting = this.occupied(spot.x,spot.y,1);
				if(deleting.connected){
					var connected = this.occupied(deleting.connected.x,deleting.connected.y,1);
				}
				if (connected){
					connected.connected = undefined;
				}
				this.eraseSpot(deleting.position.x,deleting.position.y);
			},this)
		},this.board)
		this.dropDangling(cb);
	} else {
		cb();
	}
}

Game.prototype.dropDangling = function(cb){
	var dangling = this.board.dangling();
	if(dangling.length){
		_.each(dangling,function(piece){
			this.board.eraseSpot(piece.position.x, piece.position.y);
			piece.position.y += 1;
			this.board.board[piece.position.x][piece.position.y] = piece;
		  ctx.fillStyle = piece.color;
	    ctx.fillRect(piece.position.x * block_size , (piece.position.y) * block_size, block_size, block_size);
		}, this);
		this.dropDangling(cb);
	} else {
		this.findMatches(cb);
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