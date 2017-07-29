var Trail = function() {
  this.positions = []
};

Trail.prototype.add = function(position) {
  if (frameCount % 6 == 0) {
    this.positions.unshift(createVector(position.x, position.y));
  }
};

Trail.prototype.draw = function() {
  noStroke();
  this.positions.forEach(function(position, i) {
    fill(color(0, 0, 75, 1/i));
    ellipse(position.x, position.y, 6, 6);
  })
};

Trail.prototype.clear = function() {
  this.positions = [];
};