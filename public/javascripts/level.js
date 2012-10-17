const SPEED_VEL = {'low': 300, 'med': 200, 'hi': 150};
const POINTS    = {'low': 100, 'med': 200, 'hi': 300};

function Level(n, s) {
  this.number = n;
  this.speed  = s;
}

Level.prototype.velocity = function() {
  return SPEED_VEL[this.speed.toLowerCase()];
}

Level.prototype.virus_score = function(){
  return POINTS[this.speed.toLowerCase()];
}