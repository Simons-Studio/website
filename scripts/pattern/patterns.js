activated = false;
pattern = "AABBC";

const parent = document.getElementById("p5-pattern-sketch");

function setup() {
  let canvas = createCanvas(parent.clientWidth, parent.clientHeight);
  canvas.parent("p5-pattern-sketch");

  console.log(parent);
}

function draw() {
  startScreen();
}

function windowResized() {
  resizeCanvas(parent.clientWidth, parent.clientHeight);
}

/*
 * This function will transition the sketch from the splash screen to the sketch
 */
function mousePressed() {
  if (!activated) {
    // setup sketch
  }
}

function startScreen() {
  background(0);
  textFont("Helvetica");
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(pattern, width / 4, height / 2);
}
