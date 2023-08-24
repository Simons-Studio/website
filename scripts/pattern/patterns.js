let activated = false;
let pattern = "frogling";
let index = 0;
let frameCountOffset = 0;
let pos;

// Pallet
let redwood = "#975a47";
let ecru = "#cfaa6e";
let wenge = "#716364";
let charcoal = "#3d4554";
let cadet_gray = "#9fa7ad";

const parent = document.getElementById("p5-pattern-sketch");

function setup() {
  let canvas = createCanvas(parent.clientWidth, parent.clientHeight);
  canvas.parent("p5-pattern-sketch");

  pos = { x: width / 2, y: height / 2 };
  startScreen();
}

function draw() {
  // background(cadet_gray);

  let elements = uniqueCharacters(pattern);
  let uniqueElements = elements.uniqueChars;
  let numElements = elements.numElements;

  // console.log(uniqueElements);

  let directionIndex = uniqueElements[pattern[index]];
  let direction = (directionIndex * 2 * PI) / numElements;

  let length = min(width, height) / 10;
  let nextPos = {
    x: pos.x + length * Math.cos(direction),
    y: pos.y + length * Math.sin(direction),
  };

  // console.log(numElements);

  push();
  let from = color(redwood);
  let to = color(ecru);
  let lineColour = lerpColor(from, to, directionIndex / numElements);
  stroke(lineColour);
  strokeWeight(10);
  line(pos.x, pos.y, nextPos.x, nextPos.y);
  pop();

  push();
  fill(charcoal);
  noStroke();
  rect(width / 2 - 30, height / 2 - 45, 60, 60, 10);

  textFont("Helvetica");
  textAlign(CENTER);
  textSize(50);
  fill(redwood);
  text(pattern[index], width / 2, height / 2);
  pop();

  if ((frameCount - frameCountOffset) % 5 == 0) {
    pos = bound(nextPos);
    index++;
    index %= pattern.length;
  }

  if (!activated) startScreen();
}

function bound({ x, y }) {
  x = ((x % width) + width) % width;
  y = ((y % height) + height) % height;

  return { x, y };
}

function windowResized() {
  resizeCanvas(parent.clientWidth, parent.clientHeight);
}

function uniqueCharacters(s) {
  let charIndex = 0;
  let unique = {};
  for (c of s) {
    if (unique[c] == null) {
      unique[c] = charIndex;
      charIndex++;
    }
  }
  return { uniqueChars: unique, numElements: charIndex };
}

/*
 * This function will transition the sketch from the splash screen to the sketch
 */
function mousePressed() {
  activated = true;
  background(cadet_gray);

  console.log(uniqueCharacters(pattern));
}

function startScreen() {
  background(cadet_gray);
  textFont("Helvetica");
  textAlign(CENTER);
  textSize(50);
  fill(redwood);
  text("Click", width / 2, height / 2);

  index = 0;
  frameCountOffset = frameCount;
  pos = { x: width / 2, y: height / 2 };
}
