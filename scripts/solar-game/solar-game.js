// import {p5} from "../../p5/p5"

const divId = "p5-solar-game-sketch";
const canvasParent = document.getElementById(divId);

function setup() {
  let canvas = createCanvas(400, 400);
  // let canvas = createCanvas(
  //   canvasParent.clientWidth,
  //   canvasParent.clientHeight
  // );
  // canvas.parent(divId)
  
}

function draw() {}

function mousePressed() {}

function mouseReleased() {}

function mouseDragged() {}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw() {
    background("black");
  }
}

class Card {
  constructor(type) {this.type = type;}

  draw() {}

  mousePressed() {}
  mouseDragged() {}
  mouseReleased() {}
}

class CelestialBody {
  constructor(solarPosition, type, size) {
    this.solarPosition = solarPosition;
    this.type = type;
    this.size = size;

    switch (size) {
      case 'medium':
        this.numHexes = 7;
        this.diametre = 3;
        break;
      case 'large':
        this.numHexes = 19;
        this.diametre = 5;
        break;
      default: // Small
        this.numHexes = 1;
        this.diametre = 1;
        break;
    }
  }

  draw() {
    fill("red");
    ellipse();
  }
}

class Hex {
  constructor(type) {
    this.type = type;
    switch (type) {
      case "City":
      break;

      case "Ecological":
      break;
      
      default: // Barren
        break;
    }
  }
}