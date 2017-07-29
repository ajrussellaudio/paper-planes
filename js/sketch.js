var planes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  var numPlanes = 12;
  for (var i = 0; i < numPlanes; i++) {
    planes[i] = new PaperPlane({
      color: randomPastel(), 
      size: 10, 
      direction: new Direction(i*i),
      trail: new Trail()
    });
  }
}

function draw() {
  background(255);
  planes.forEach(function(plane) {
    plane.move();
    plane.drawTrail();
    plane.draw();
  })
}

function randomPastel() {
  return color(random(360), 20, 100, 1);
}