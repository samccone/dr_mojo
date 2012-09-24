function Level(n, s) {
  this.number = n;
  this.speed  = s;
}

Level.prototype.velocity = function() {
  var speed_in_number = {'Low': 300, 'Med': 600, 'High': 900};
  return speed_in_number[this.speed];
}
