const SPEED_VEL = {'Low': 300, 'Med': 600, 'High': 900};

function Level(n, s) {
  this.number = n;
  this.speed  = s;
}

Level.prototype.velocity = function() {
  return SPEED_VEL[this.speed];
}

Level.prototype.virus_score = function(){
  return SPEED_VEL[this.speed] / (SPEED_VEL['Low']/100);
}