const divId = "p5-game-of-life-sketch";
const parent = document.getElementById(divId);

let palette;

let board;

function setup() {
  let canvas = createCanvas(parent.clientWidth, parent.clientHeight);
  canvas.parent(divId);

  palette = {
    ecru: color("#cfaa6e"),
    redwood: color("#975a47"),
    wenge: color("#716364"),
    charcoal: color("#3d4554"),
    cadet_gray: color("#9fa7ad"),
  };
}

function draw() {
  background(palette.cadet_gray);
}

class Board {
  constructor(
    minRequiredNeighbours = 2,
    maxRequiredNeighbours = 3,
    reproductionThreshold = 3
  ) {
    this.minRequiredNeighbours = minRequiredNeighbours;
    this.maxRequiredNeighbours = maxRequiredNeighbours;
    this.reproductionThreshold = reproductionThreshold;

    this.board = zeros(10, 10);
  }

  iterate() {}

  safeSumNeightbours(row, col) {
    let sum = 0;
    let startRow = row > 0 ? row - 1 : 0;
    let startCol = col > 0 ? col - 1 : 0;
    let endRow = row < this.numRows() - 1 ? row + 1 : this.numRows() - 1;
    let endCol = row < this.numCols() - 1 ? col + 1 : this.numCols() - 1;

    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        sum += this.board[i][j];
      }
    }

    sumWithoutSelf = sum - this.board[row][col];
    return sumWithoutSelf;
  }

  unsafeSumNeighbours(row, col) {
    let startRow = row - 1;
    let startCol = col - 1;
    let endRow = row + 1;
    let endCol = col + 1;

    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        sum += this.board[i][j];
      }
    }

    sumWithoutSelf = sum - this.board[row][col];
    return sumWithoutSelf;
  }

  numRows() {
    return this.board.length;
  }

  numCols() {
    if (this.board.length > 0) return this.board[0].length;
    else return 0;
  }

  resize() {}
}

function zeros(rows, columns) {
  let zeroArray = new Array(rows);
  for (let i = 0; i < rows; i++) {
    let row = new Array(columns);
    for (let j = 0; j < columns; j++) {
      row.push(false);
    }
    zeroArray.push(row);
  }
}
