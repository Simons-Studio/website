let colourShapes = [];
let greyShapes = [];
let eyePosition;
let eyeRotation;
let eyeD;
let eyeBeam;

let numberOfCircles;

function setup() {
  createCanvas(windowWidth, windowHeight);

  eyePosition = createVector(0, 0);
  eyeRotation = 0;
  calcEyeD();

  numberOfCircles = 100;

  // Palette
  let redwood = color("#975a47");
  let ecru = color("#cfaa6e");
  let wenge = color("#716364");
  let charcoal = color("#3d4554");
  let cadet_gray = color("#9fa7ad");

  for (let i = 0; i < numberOfCircles; i++) {
    colourShapes.push(
      new ColorElement(
        createVector(random(0, width), random(0, height)),
        lerpColor(ecru, redwood, random(0, 1))
      )
    );
  }
}

function draw() {
  background("#9fa7ad");
  setting();

  // Eye variables
  let breathing = sin(((frameCount % 1200) / 1200) * 2 * PI);
  let eyeOpen = PI / 2 + (1 / 9) * PI * breathing;
  let irisColour = color(0, 130, 190, 250);

  // Move the monster
  if (colourShapes.length > 0) {
    let target = colourShapes[0];
    irisColour = target.getColour();

    // find the destination
    let dest = eyeDestination(eyePosition, target.getPos(), eyeBeam);
    let destPos = dest.dest;
    let destAngle = dest.angle;

    // Calculate the movement increments
    let move = eyeMove(eyePosition, eyeRotation, destPos, destAngle);

    eyePosition.add(move.move);
    eyeRotation += move.rotate;

    // De-colour the shapes
    if (move.arrived) {
      let transfer = colourShapes.shift();
      transfer.removeColour();
      greyShapes.push(transfer);
    }
  }

  let c = color(220, 250);
  fill(c);

  // All the components that build the eye
  beam(eyePosition, eyeRotation, eyeBeam);
  ellipse(eyePosition.x, eyePosition.y, eyeD);
  vein(eyePosition.x, eyePosition.y, eyeD, eyeRotation);
  iris(eyePosition.x, eyePosition.y, eyeD, eyeRotation, irisColour);
  eyelid(eyePosition.x, eyePosition.y, eyeD, eyeRotation, eyeOpen);
  // Legs
  let numLegs = 6;
  for (let i = 0; i < numLegs; i++) {
    let left = i >= numLegs / 2;
    leg(
      eyePosition.x,
      eyePosition.y,
      eyeD,
      eyeRotation,
      (3 * PI) / 8 + (i * 5 * PI) / (4 * numLegs - 1),
      left
    );
  }
}

function resizeShapes(oldWidth, oldHeight, newWidth, newHeight) {
  for (shape of colourShapes) {
    shape.startP.x *= newWidth / oldWidth;
    shape.startP.y *= newHeight / oldHeight;
  }

  for (shape of greyShapes) {
    shape.startP.x *= newWidth / oldWidth;
    shape.startP.y *= newHeight / oldHeight;
  }
}

function calcEyeD() {
  eyeD = (max(width, height) * 3) / 16;
  eyeBeam = (max(width, height) * 5) / 16;
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "monster.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("monster.png");
  }
}

function mouseReleased() {
  if (colourShapes.length < numberOfCircles) {
    let redwood = color("#975a47");
    let ecru = color("#cfaa6e");
    colourShapes.unshift(
      new ColorElement(
        createVector(mouseX, mouseY),
        lerpColor(ecru, redwood, random(0, 1))
      )
    );
    greyShapes.shift();
  }
}

// A class to define the colourful shapes that makeup the background
class ColorElement {
  constructor(startP, colour) {
    this.startP = startP;
    this.colour = colour;
    this.size = random(5, 50);

    //! start simple with a sphere
  }

  // This function changes the colour of the shapes to greyscale
  removeColour() {
    let c = this.colour;
    let originalSaturation = saturation(c);
    // let grayscale = 0.2126 * red(c) + 0.7152 * green(c) + 0.0722 * blue(c);
    // console.log(originalSaturation / 128);

    let wenge = color("#716364");
    let charcoal = color("#3d4554");
    this.colour = lerpColor(wenge, charcoal, originalSaturation / 128);
  }

  getPos() {
    return this.startP;
  }

  getColour() {
    return this.colour;
  }

  // Draw function for our shapes
  draw() {
    push();
    noStroke();
    fill(this.colour);
    ellipse(this.startP.x, this.startP.y, this.size);
    pop();
  }
}

// This is to draw the environment that the monster is set in
function setting() {
  // 2% of the time create a new shape object and store it
  // if (random(99) >= 97 && colourShapes.length < 200) {
  //   colourShapes.push(new ColorElement(
  //     createVector(random(0, width), random(0, height)),
  //     color(random(255), random(255), random(255))
  //     ));
  // }

  // Draw the shapes onto the screen
  for (let i = 0; i < greyShapes.length; i++) {
    greyShapes[i].draw();
  }
  for (let i = 0; i < colourShapes.length; i++) {
    colourShapes[i].draw();
  }
}

// This function determines the destination position of the eye, given
// the length of the beam (beamLength), the initial position of the
// eye (pos) and the position of the ColourElement (colourPos);
function eyeDestination(pos, colourPos, beamLength) {
  let diffV = p5.Vector.sub(colourPos, pos);
  let dest = pos;

  diffV.setMag(beamLength);
  dest = p5.Vector.sub(colourPos, diffV);

  return { dest: dest, angle: diffV.heading() };
}

// This function determines the incremental movement amounts for the
// eye, given the eye's position (pos), angle (angle), destination (dest)
// and target angle (destAngle).
function eyeMove(pos, angle, dest, destAngle) {
  let speed = 30;
  let distantToTarget = p5.Vector.sub(dest, pos).mag();
  let angleToTarget = destAngle - angle;
  let arrived = distantToTarget < 2 && angleToTarget < PI / 90;
  let posAdd = p5.Vector.sub(dest, pos).div(speed);
  let angAdd = (destAngle - angle) / speed;

  return { move: posAdd, rotate: angAdd, arrived: arrived };
}

// Draw the veins on an eye given its position (x, y) and diameter (d)
// this can then be rotated about the circle using "rotation". Teen
// "angle" describes the where our leg can come from
function leg(x, y, d, rotation, angle, left) {
  push();
  // legs cannot all come out of the same point
  let join = createVector(
    x + d * 0.53 * cos(rotation + angle),
    y + d * 0.53 * sin(rotation + angle)
  );
  let base = createVector(0, join.y);
  let edgeAngle = PI;

  // calculate the closest edge we can simplify the calculation
  // by knowing that our eye sits in a box. Leg looks for closest
  // wall, and then folds to preserve its own length
  let length = join.x;
  if (length > width - join.x) {
    base.x = width;
    length = width - join.x;
    edgeAngle = 0;
  }
  if (length > join.y) {
    base.x = join.x;
    base.y = 0;
    length = join.y;
    edgeAngle = -PI / 2;
  }
  if (length > height - join.y) {
    base.x = join.x;
    base.y = height;
    length = height - join.y;
    edgeAngle = PI / 2;
  }

  // 2 segment legs -> determine the angle that the first segment
  // leaves the eyelid
  let segmentLength = 150;
  let segmentWidth = 10;
  // If leg cannot reach nearest wall then detach from wall and bend
  if (length > 2 * segmentLength) {
    length = 1.7 * segmentLength;
    base = createVector(
      join.x + length * cos(edgeAngle),
      join.y + length * sin(edgeAngle)
    );
  }
  let kneeAngle = acos(length / (2 * segmentLength));
  // Left leg angle needs to be reversed
  if (left) kneeAngle = -kneeAngle;
  let midPoint = createVector(
    join.x + segmentLength * cos(edgeAngle + kneeAngle),
    join.y + segmentLength * sin(edgeAngle + kneeAngle)
  );

  fill(222, 184, 135);
  stroke(222, 184, 135);
  strokeWeight(segmentWidth);
  line(join.x, join.y, midPoint.x, midPoint.y);
  line(base.x, base.y, midPoint.x, midPoint.y);

  pop();
}

// This function draws the colour sucking beam from the eye, given its "origin",
// "rotation" and the length that the beam travels (beamLength).
function beam(origin, rotation, beamLength) {
  push();
  let d = 50;
  noStroke();
  fill(200, 200, 0, 50);

  //End points of the triangle (points one and two)
  let pointOne = createVector(beamLength, d / 2);
  pointOne.rotate(rotation);
  pointOne.add(origin);
  let pointTwo = createVector(beamLength, -d / 2);
  pointTwo.rotate(rotation);
  pointTwo.add(origin);

  // Centre of the beams circular end
  let centre = createVector(beamLength, 0);
  centre.rotate(rotation);
  centre.add(origin);

  // draw
  triangle(origin.x, origin.y, pointOne.x, pointOne.y, pointTwo.x, pointTwo.y);
  ellipse(centre.x, centre.y, d);
  pop();
}

// Draw the eyelid on an eye given its position (x, y) and diameter (d)
// this can then be rotated about the circle using "rotation". The
// eyelid can be opened to an angle given by "open".
function eyelid(x, y, d, rotation, open) {
  push();
  strokeWeight(3);
  stroke(222, 184, 135);
  fill(255, 204, 153);
  arc(x, y, 1.06 * d, 1.06 * d, rotation + open / 2, rotation - open / 2, PIE);
  // TODO: Eyelashes
  pop();
}

// Draw the veins on an eye given its position (x, y) and diameter (d)
// this can then be rotated about the circle using "rotation"
function vein(x, y, d, rotation) {
  push();

  fill(255, 0, 0);
  stroke(255, 0, 0);
  strokeWeight(1);
  let originPercent = d * 0.35;
  let origin = createVector(
    x - originPercent * cos(rotation),
    y - originPercent * sin(rotation)
  );

  // The veins use a fractal pattern created by a recursive function
  // veinHelper
  let depth = 3;
  let length = d / 3;
  veinHelper(depth, origin, rotation, length);

  pop();
}

// This function is recursive and creates progressively smaller lines.
// "depth" describes the number of recursions that can happen. "v" is
// the initial position, rotation is the old rotation, and "length" is
// the fractal length that is passed through
function veinHelper(depth, v, rotation, length) {
  let angle = (25 / 360) * 2 * PI;
  let firstBranch = 0.5 * length;
  let secondBranch = 0.7 * length;

  let end = createVector(
    v.x + length * cos(rotation),
    v.y + length * sin(rotation)
  );
  line(v.x, v.y, end.x, end.y);

  if (depth > 0) {
    depth = depth - 1;

    // The fractal branches from two points
    let firstNode = createVector(
      v.x + firstBranch * cos(rotation),
      v.y + firstBranch * sin(rotation)
    );
    // Recursively passing through new branches
    veinHelper(depth, firstNode, rotation - 2 * angle, secondBranch);
    veinHelper(depth, firstNode, rotation + 2 * angle, secondBranch);
    veinHelper(depth, end, rotation + angle, secondBranch);
    veinHelper(depth, end, rotation - angle, secondBranch);
  }
}

// Draw the iris and pupil on an eye given its position (x, y) and diameter (d)
// this can then be rotated about the circle using "rotation"
function iris(x, y, d, rotation, irisColour) {
  push();

  fill(irisColour);
  stroke(30);

  // define the curve points of the iris
  let lensArc = (1 / 3) * PI;
  let apex = createVector(
    x + d * 0.53 * cos(rotation),
    y + d * 0.53 * sin(rotation)
  );
  let endP = createVector(
    x + (d / 2) * cos(rotation + lensArc / 2),
    y + (d / 2) * sin(rotation + lensArc / 2)
  );
  let endN = createVector(
    x + (d / 2) * cos(rotation - lensArc / 2),
    y + (d / 2) * sin(rotation - lensArc / 2)
  );
  let base = createVector(
    x + d * 0.42 * cos(rotation),
    y + d * 0.42 * sin(rotation)
  );

  // the iris
  beginShape();
  curveVertex(base.x, base.y);
  curveVertex(base.x, base.y);
  curveVertex(endP.x, endP.y);
  curveVertex(apex.x, apex.y);
  curveVertex(endN.x, endN.y);
  curveVertex(base.x, base.y);
  curveVertex(base.x, base.y);
  endShape();

  // define the curve points of the pupil
  let pupilArc = (1 / 6) * PI;
  let pupP = createVector(
    x + d * 0.51 * cos(rotation + pupilArc / 2),
    y + d * 0.51 * sin(rotation + pupilArc / 2)
  );
  let pupN = createVector(
    x + d * 0.51 * cos(rotation - pupilArc / 2),
    y + d * 0.51 * sin(rotation - pupilArc / 2)
  );
  let pupBase = createVector(
    x + d * 0.49 * cos(rotation),
    y + d * 0.49 * sin(rotation)
  );

  fill(0, 240);
  // the pupil
  beginShape();
  curveVertex(pupBase.x, pupBase.y);
  curveVertex(pupBase.x, pupBase.y);
  curveVertex(pupP.x, pupP.y);
  curveVertex(apex.x, apex.y);
  curveVertex(pupN.x, pupN.y);
  curveVertex(pupBase.x, pupBase.y);
  curveVertex(pupBase.x, pupBase.y);
  endShape();

  pop();
}

function windowResized() {
  let oldWidth = width;
  let oldHeight = height;
  resizeCanvas(windowWidth, windowHeight);
  calcEyeD();
  resizeShapes(oldWidth, oldHeight, width, height);
}
