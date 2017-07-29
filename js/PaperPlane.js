var PaperPlane = function(options) {
  this.color = options.color;
  this.size = options.size;
  this.direction = options.direction;
  this.trail = options.trail;
  this.position = createVector(width + random(width), random(height));
  this.rotation = atan2(this.position.y - mouseY, this.position.x - mouseX);
  this.speed = random() * 5 + 3;
  
};

PaperPlane.prototype.move = function() {
  var direction = this.direction.move();
  this.rotation = atan2(this.position.y - direction.y, this.position.x - direction.x);
  this.position.sub(p5.Vector.fromAngle(this.rotation).mult(this.speed));
  if (this.position.x < -250) {
    this.reset();
  }
};

PaperPlane.prototype.draw = function() {
  strokeWeight(2 / this.size);
  stroke("#333333")
  fill(this.color);
  push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    scale(this.size);
    this.drawShape({
      front: createVector(-15, 0),
      back: createVector(2, 1),
      bottomWingTip: createVector(3, 5),
      bottomWingFold: createVector(0, 0),
      topWingTip: createVector(2, -6),
      topWingFold: createVector(0, -1)
    });
  pop();
  this.trail.add(this.position);
};

PaperPlane.prototype.drawShape = function(corners) {
  this.drawComponent([corners.front, corners.topWingFold, corners.back], this.shadedColor());
  this.drawComponent([corners.front, corners.topWingFold, corners.topWingTip]);
  this.drawComponent([corners.front, corners.bottomWingFold, corners.bottomWingTip]);
  this.drawComponent([corners.bottomWingFold, corners.back])
};

PaperPlane.prototype.drawComponent = function(corners, color = this.color) {
  fill(color);
  beginShape();
    corners.forEach(function(corner) {
      vertex(corner.x, corner.y)
    });
  endShape(CLOSE);
};

PaperPlane.prototype.drawTrail = function(position, counter) {
  this.trail.draw();
};

PaperPlane.prototype.reset = function() {
  this.color = randomPastel();
  this.position = createVector(width + 200, random(height));
  this.speed = random() * 5 + 3;
  this.trail.clear();
};

PaperPlane.prototype.shadedColor = function() {
  return color(hue(this.color), saturation(this.color) + 10, brightness(this.color) - 7, alpha(this.color));
};