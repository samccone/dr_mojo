function Game() {
	this.board 					= new Board(board_size[0],board_size[1]);
	this.detector 			= new CollisionDetector(this.board);
	this.paused					= false;
	this.done						= false;
	this.noInteractions = false;
	this.setListeners();
}

Game.prototype.newPill = function() {
	this.noInteractions = false;
	return this.active_pill = new Pill(this.board, this.detector);
}

Game.prototype.gameOver = function() {
  this.done = true;
  this.clock = window.clearInterval(this.clock);
}

Game.prototype.setListeners = function() {
	var _this = this;
	window.addEventListener('keydown', function(e){
		if(!_this.noInteractions){
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
	if ( this.checkHit() || this.active_pill.isEmpty()) {
		this.findMatches(function(){
		if (!this.clock){
				var _this = this;
				this.clock = window.setInterval(function(){_this.tick()}, this.game_speed);
		}
			//Change this to where the pills are created
			if(this.board.occupied(0,0)){
				console.log("game over");
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
	var _this = this;
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
				var spot = deleting.pos;
				this.eraseSpot(deleting.pill.position[spot].x,deleting.pill.position[spot].y, 1);
				_this.noInteractions = true;
			},this)
		},this.board)
		this.dropDangling(cb);
	} else {
		cb();
	}
}

Game.prototype.dropDangling = function(cb){
	var dangling = this.board.dangling();
	_.each(dangling, function(obj){
		obj.pill.moveDown();
	},this);
	if(dangling.length > 0 ){
		var _this = this;
		window.clearInterval(_this.clock);
		_this.clock = undefined;
		var next = _.bind(this.dropDangling,this,cb);
		setTimeout(next,this.game_speed);
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