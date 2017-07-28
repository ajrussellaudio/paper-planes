var planes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var numPlanes = 10;
  for (var i = 0; i < numPlanes; i++) {
    planes[i] = new PaperPlane({
      color: randomPastel(), 
      size: min(i * 2, 10), 
      direction: new Direction(i*i)
    });
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