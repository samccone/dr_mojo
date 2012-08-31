function Game() {
  this.board = new Board(board_size[0], board_size[1]);
  this.detector = new CollisionDetector(this.board);
  this.paused = false;
  this.done = false;
  this.noInteractions = false;
  this.virusCount = 0;
  this.colors = ["green", "red", "blue"];
  this.setListeners();
}

Game.prototype.newPill = function() {
  this.noInteractions = false;
  return this.active_pill = new Pill(this.board, this.detector);
}

Game.prototype.updateVirusCount = function(change) {
  this.virusCount += change;
  this.setVirusCount();
}

Game.prototype.newVirus = function(level, num) {
  var virus = new Virus(this, level, num);
  this.updateVirusCount(1);
  return virus;
}

Game.prototype.gameOver = function() {
  this.done = true;
  this.clock = window.clearInterval(this.clock);
}

Game.prototype.setListeners = function() {
  var _this = this;
  window.addEventListener('keydown', function(e) {
    if (!_this.noInteractions) {
      switch (e.keyCode) {
      case 65:
        //a
        _this.pillAction('rotate-left');
        break;
      case 83:
        //s
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
  if (!this.paused && !this.done) {
    switch (action) {
    case 'rotate-left':
      this.active_pill.rotateLeft();
      break;
    case 'rotate-right':
      this.active_pill.rotateRight();
      break;
    case 'left':
      this.active_pill.moveLeft();
      break;
    case 'right':
      this.active_pill.moveRight();
      break;
    case 'down':
      this.active_pill.moveDown();
      break;
    }
  }
}

Game.prototype.togglePause = function() {
  this.paused = !this.paused;
}

Game.prototype.tick = function() {
  this.pillAction('down');
  if (this.checkHit() || this.active_pill.isEmpty()) {
    this.findMatches(function() {
      if (!this.clock) {
        var _this = this;
        this.clock = window.setInterval(function() {
          _this.tick()
        }, this.game_speed);
      }
      //Change this to where the pills are created
      if (this.board.occupied(Math.floor(this.board.width / 2) - 1, 0)) {
        alert("game over");
        this.gameOver();
      } else if (this.virusCount == 0) {
        this.nextLevel();
      } else {
        this.newPill();
      }
    });
  }
}

Game.prototype.nextLevel = function() {
  this.gameOver();
  this.board.clearAll();
  the_game.populateViruses(++level);
  alert("Level " + (parseInt(level, 10) + 1));
  the_game.start(300);
}

Game.prototype.findMatches = function(cb) {
  var cb = _.bind(cb, this);
  var matches = this.board.matches();
  var _this = this;
  if (matches.length) {
    _.each(matches, function(match_set) {
      _.each(match_set, function(spot) {
        var deleting = this.occupied(spot.x, spot.y, 1);
        if (deleting.connected) {
          this.occupied(deleting.connected.x, deleting.connected.y, 1).connected = undefined;
        }
        var spot = deleting.pos;
        if (deleting.pill.position[spot]) {
          this.eraseSpot(deleting.pill.position[spot].x, deleting.pill.position[spot].y, 1);
        } else {
          this.eraseSpot(deleting.pill.position.x, deleting.pill.position.y, 1);
          _this.updateVirusCount(-1);
        }
        _this.noInteractions = true;
      }, this)
    }, this.board)
    this.dropDangling(cb);
  } else {
    cb();
  }
}

Game.prototype.dropDangling = function(cb) {
  var dangling = this.board.dangling();
  _.each(dangling, function(obj) {
    obj.pill.moveDown();
  }, this);
  if (dangling.length > 0) {
    var _this = this;
    window.clearInterval(_this.clock);
    _this.clock = undefined;
    var next = _.bind(this.dropDangling, this, cb);
    setTimeout(next, this.game_speed);
  } else {
    this.findMatches(cb);
  }
}

Game.prototype.start = function(speed) {
  var _this = this;
  this.done = false;
  this.newPill();
  this.game_speed = speed;
  this.clock = window.setInterval(function() {
    _this.tick()
  }, this.game_speed);
}

Game.prototype.populateViruses = function(level) {
  var self = this;
  var pseudoLevel = Math.min(level, 23);
  for (var i = 1; i <= ((pseudoLevel * 4) + 4); i++) {
    self.newVirus(pseudoLevel, i);
  }
}

Game.prototype.checkHit = function() {
  return this.active_pill.collision;
}

Game.prototype.setVirusCount = function() {
  document.getElementById("viruses").innerHTML = this.virusCount;
}