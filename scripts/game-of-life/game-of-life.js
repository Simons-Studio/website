const parent = document.getElementById("p5-game-of-life-sketch");

let palette = {
  ecru,
  redwood,
  wenge,
  charcoal,
  cadet_gray,
};

let matrix;

function setup() {
  let canvas = createCanvas(parent.clientWidth, parent.clientHeight);
  canvas.parent("p5-game-of-life-sketch");

  palette.ecru = color("#cfaa6e");
  palette.redwood = color("#975a47");
  palette.wenge = color("#716364");
  palette.charcoal = color("#3d4554");
  palette.cadet_gray = color("#9fa7ad");
}

function zeros(rows, columns) {}
