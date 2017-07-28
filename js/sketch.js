var planes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var numPlanes = 10;
  
  for (var i = 0; i < numPlanes; i++) {
    direction = new PlaneDirection(i*i);
    planes[i] = new PaperPlane(randomPastel(), min(i + 5, 20), direction);
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
    this.drawShape();
  pop();
};

PaperPlane.prototype.drawShape = function() {
  beginShape();
    vertex(-11, 4);
    vertex(-3, 0);
    vertex(0, 0);
    vertex(-2, 4);
  endShape(CLOSE);
  beginShape();
    vertex(-11, 4);
    vertex(1, 4);
    vertex(-2, 1);
    vertex(-11, 4);
    vertex(-2, 0);
    vertex(-3, -3);
  endShape(CLOSE);
};

var PlaneDirection = function(seed) {
  this.seed = seed;
  this.noiseScale = 0.0;
}

PlaneDirection.prototype.move = function() {
  return createVector(-300, this.vertical());
};

PlaneDirection.prototype.vertical = function() {
  noiseSeed(this.seed);
  this.noiseScale += random() * 0.01;
  return map(noise(this.noiseScale), 0, 1, 0 - height, height * 2);
};