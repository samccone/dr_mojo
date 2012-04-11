function Game() {
	this.active_pill = new Pill();
	this.setListeners();
}

Game.prototype.setListeners = function() {
	var _this = this;
	window.addEventListener('keydown', function(e){
		switch( e.keyCode ) {
			case 37:
				_this.active_pill.moveLeft();
			break;
			case 39:
				_this.active_pill.moveRight();
			break;
		}
	});
}

Game.prototype.tick = function() {
	console.log("tick");
}

Game.prototype.start = function(){
	this.game_speed = parseInt(prompt("Game Speed?"), 10);
	this.clock = window.setInterval(this.tick, this.game_speed);
}