var PaperPlane = function(options) {
  this.color = options.color;
  this.size = options.size;
  this.direction = options.direction;
  this.position = createVector(width + random(width), random(height));
  this.rotation = atan2(this.position.y - mouseY, this.position.x - mouseX);
  this.speed = random() * 5 + 3;
};

PaperPlane.prototype.move = function() {
  var direction = this.direction.move();
  this.rotation = atan2(this.position.y - direction.y, this.position.x - direction.x);
  this.position.sub(p5.Vector.fromAngle(this.rotation).mult(this.speed));
  if (this.position.x < -250) {
    this.color = randomPastel();
    this.position = createVector(width + 200, random(height));
    this.speed = random() * 5 + 3;
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
      back: createVector(3, 0),
      bottomWingTip: createVector(3, 5),
      bottomWingFold: createVector(0, 0),
      topWingTip: createVector(2, -7),
      topWingFold: createVector(0, -2),
      bodyBase: createVector(-2, 3)
    });
  pop();
};

PaperPlane.prototype.drawShape = function(corners) {
  this.drawComponent([corners.front, corners.topWingFold, corners.back, corners.bodyBase]);
  this.drawComponent([corners.front, corners.topWingFold, corners.topWingTip]);
  this.drawComponent([corners.front, corners.bottomWingFold, corners.bottomWingTip]);
};

PaperPlane.prototype.drawComponent = function(corners) {
  beginShape();
    corners.forEach(function(corner) {
      vertex(corner.x, corner.y)
    });
  endShape(CLOSE);
};