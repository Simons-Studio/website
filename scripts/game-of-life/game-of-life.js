import * as p5 from "https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js";

const parent = document.getElementById("p5-game-of-life-sketch");

// Palette
let redwood;
let ecru;
let wenge;
let charcoal;
let cadet_gray;

let matrix;

function setup() {
  let canvas = createCanvas(parent.clientWidth, parent.clientHeight);
  canvas.parent("p5-game-of-life-sketch");

  redwood = color("#975a47");
  ecru = color("#cfaa6e");
  wenge = color("#716364");
  charcoal = color("#3d4554");
  cadet_gray = color("#9fa7ad");

  math.zeros;
}

function draw() {
  background(cadet_gray);
}
