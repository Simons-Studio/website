pattern = "AABBC";

const renderer = new p5.Renderer(document.getElementById("p5-pattern-sketch"));

function setup() {
  background(0);

  transform(width / 2, height / 2);
}

function draw() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
