function Game(lvl, speed) {
  this.board = new Board(board_size[0], board_size[1]);
  this.detector = new CollisionDetector(this.board);
  this.paused = false;
  this.done = false;
  this.noInteractions = false;
  this.virusCount = 0;
  this.colors = ["green", "red", "blue"];
  this.active_pill = new Pill(this.board, this.detector);
  this.next_pill = new Pill(this.board, this.detector);
  this.level = new Level(lvl, speed);
  this.score = 0;
  this.setScore();
  this.setInfo();
  this.setListeners();
  this.populateViruses(this.level.number);
}

Game.prototype.newPill = function() {
  this.noInteractions = false;
  this.active_pill = this.next_pill;
  this.next_pill = new Pill(this.board, this.detector);
  this.active_pill.draw();
  this.next_pill.draw(oracle_ctx);
  return this.active_pill;
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
        $("#gameOverModal").trigger('reveal:close');
        $("#nextLevelModal").trigger('reveal:close');
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
      case 191:
        _this.toggleInstructions();
        break;
      case 72:
        _this.toggleHelp();
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
      window.Sound.rotate();
      break;
    case 'rotate-right':
      this.active_pill.rotateRight();
      window.Sound.rotate();
      break;
    case 'left':
      this.active_pill.moveLeft() && window.Sound.move();
      break;
    case 'right':
      this.active_pill.moveRight() && window.Sound.move();
      break;
    case 'down':
      this.active_pill.moveDown();
      break;
    }
  }
}

Game.prototype.togglePause = function() {
  this.paused = !this.paused;
  Utils.shading(this.paused, 'Pause');
}

Game.prototype.toggleInstructions = function(){
  this.paused = !this.paused;
  Utils.shading(this.paused, $('#instructions').html());
}

Game.prototype.toggleHelp = function(){
  this.paused = !this.paused;
  Utils.shading(this.paused, $('.controls').html());
}

Game.prototype.tick = function() {
  this.pillAction('down');
  if (this.checkHit() || this.active_pill.isEmpty()) {
    this.findMatches(function() {
      if (!this.clock) {
        var _this = this;
        this.clock = window.setInterval(function() {
          _this.tick()
        }, this.level.velocity());
      }
      //Change this to where the pills are created
      if (this.board.occupied(Math.floor(this.board.width / 2) - 1, 0)) {
        $('#gameOverModal').reveal()
        this.saveScore();
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
  the_game.level.number++;
  this.setLevel();
  the_game.populateViruses(the_game.level.number);
  $(".nextLevelNumber").html(the_game.level.number);
  $("#nextLevelModal").reveal();
  this.paused = true;
  the_game.start(this.level.velocity());
}

Game.prototype.findMatches = function(cb) {
  var cb = _.bind(cb, this);
  var matches = this.board.matches();
  var _this = this;

  if (matches.length) {
    var virus_count = 0;
    _.each(matches, function(match_set){
      virus_count = _.filter(match_set, function(coord) {
        var cell = _this.board.occupied(coord.x, coord.y, 1);
        return (cell.pill.type === 'Virus');
      }).length;
    });
    this.scoring(virus_count);
    this.setScore();

    _.each(matches, function(match_set) {
      _.each(match_set, function(spot) {
        var deleting = this.occupied(spot.x, spot.y, 1);
        if (deleting != undefined){
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
    setTimeout(next, this.level.velocity());
  } else {
    this.findMatches(cb);
  }
}

Game.prototype.start = function() {
  var _this = this;
  this.done = false;
  this.newPill();
  this.clock = window.setInterval(function() {
    _this.tick()
  }, this.level.velocity());
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
  $("#viruses").html(this.virusCount);
}

Game.prototype.setLevel = function() {
  $("#level_count").html(this.level.number);
}

Game.prototype.saveScore = function() {
  var score = new app.models.Score({score: this.score});
  score.save();
}

Game.prototype.setScore = function() {
  var query = new Parse.Query(app.models.Score);

  $("#score .score").html(this.score);

  query.descending("score").limit(1);
  query.first({
    success: function(object) {
      $("#highScore .score").html(object.attributes.score);
    },
    error: function(error) {
      $("#highScore .score").html('0000000');
    }
  });
}

Game.prototype.setInfo = function() {
  $("#speed_count").html(this.level.speed);
  this.setLevel();
  this.setVirusCount();
}

// ----------------------------------------------------------------------------
// -------------------------- Dr. Mojo Scoring --------------------------------
// ----------------------------------------------------------------------------
// Virus Kills           Low Speed           Medium Speed           High Speed
//     1                    100                  200                    300
//     2                    200                  400                    600
//     3                    400                  800                   1200
//     4                    800                 1600                   2400
//     5                   1600                 3200                   4800
//     6                   3200                 6400                   9600

// Combos mean more points per virus. The scoring adds up, so if you kill three
// viruses with one Pill Drop on Medium Speed:

//  200 + 400 + 800 = 1400

// If you were to just score three singles instead, you would only get 600
// points, meaning it pays to set up combos!
Game.prototype.scoring = function(virus_count) {
  var sum = 0;

  for(var i=0; i <= virus_count-1; ++i){
    sum += this.level.virus_score() * Math.pow(2, i);
  }

  this.score += sum;
}