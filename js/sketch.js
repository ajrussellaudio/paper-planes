var planes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var numPlanes = 10;
  for (var i = 0; i < numPlanes; i++) {
    direction = new PlaneDirection(i*i);
    planes[i] = new PaperPlane(randomPastel(), min(i * 2, 10), direction);
  }
}

function draw() {
  background(255);
  planes.forEach(function(plane) {
    plane.move();
    plane.draw();
  })
}

function randomPastel() {
  function lightGrey() {
    return random(196, 255);
  }
  return color(lightGrey(), lightGrey(), lightGrey());
}

var PaperPlane = function(color, size, direction) {
  this.color = randomPastel();
  this.size = size;
  this.direction = direction;
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
      createVertex(corner);
    });
  endShape(CLOSE);
};

var PlaneDirection = function(seed) {
  this.seed = seed;
  this.noiseScale = 0.0;
};

PlaneDirection.prototype.move = function() {
  return createVector(-300, this.vertical());
};

PlaneDirection.prototype.vertical = function() {
  noiseSeed(this.seed);
  this.noiseScale += random() * 0.01;
  return map(noise(this.noiseScale), 0, 1, 0 - height, height * 2);
};

function createVertex(corner) {
  return vertex(corner.x, corner.y);
}