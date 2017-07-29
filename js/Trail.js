var Trail = function() {
  this.positions = []
};

Trail.prototype.add = function(position, counter) {
  if (counter % 3 === 0) {
    this.positions.unshift(createVector(position.x, position.y));
  }
};

Trail.prototype.draw = function() {
  noStroke();
  this.positions.forEach(function(position, i) {
    fill(128, 255/i);
    ellipse(position.x, position.y, 7, 7);
  })
};

Trail.prototype.clear = function() {
  this.positions = [];
};