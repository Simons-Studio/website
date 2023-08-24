pattern = "AABBC";

// const renderer = new p5.Renderer(document.getElementById("p5-pattern-sketch"));

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
