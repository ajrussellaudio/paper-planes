var Direction = function(seed) {
  this.seed = seed;
  this.noiseScale = 0.0;
};

Direction.prototype.move = function() {
  return createVector(-300, this.vertical());
};

Direction.prototype.vertical = function() {
  noiseSeed(this.seed);
  this.noiseScale += random() * 0.01;
  return map(noise(this.noiseScale), 0, 1, 0 - height, height * 2);
};