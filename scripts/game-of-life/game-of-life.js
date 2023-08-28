const divId = "p5-game-of-life-sketch";
const parent = document.getElementById(divId);

let palette;
let board;
let paused = true;

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

  board = new Board(width, height);
}

function draw() {
  background(palette.cadet_gray);
  board.draw();
  if (!paused) {
    board.iterate();
  }
}

function mouseReleased() {
  let cell = board.screenToCell(mouseX, mouseY);
  board.setCell(cell.row, cell.col);

  paused = false;

  // Prevent default behaviour
  return false;
}

function mouseDragged() {
  let cell = board.screenToCell(mouseX, mouseY);
  board.setCell(cell.row, cell.col);

  paused = true;

  // Prevent default behaviour
  return false;
}

function windowResized() {
  resizeCanvas(parent.clientWidth, parent.clientHeight);
  board.resize(width, height);
}

class Board {
  constructor(
    width,
    height,
    minRequiredNeighbours = 2,
    maxRequiredNeighbours = 3,
    reproductionThreshold = 3
  ) {
    this.minRequiredNeighbours = minRequiredNeighbours;
    this.maxRequiredNeighbours = maxRequiredNeighbours;
    this.reproductionThreshold = reproductionThreshold;

    this.smallSideNum = 50;
    this.cellSize = min(width, height) / this.smallSideNum;

    let rows;
    let cols;
    if (width < height) {
      rows = Math.floor(height / this.cellSize);
      cols = this.smallSideNum;
    } else {
      rows = this.smallSideNum;
      cols = Math.floor(width / this.cellSize);
    }

    this.currentBoard = initArrayToFalse(rows, cols);
    this.nextBoard = initArrayToFalse(rows, cols);
  }

  draw() {
    noStroke();
    fill(palette.redwood);
    let spacer = this.cellSize / 10;

    let rows = this.numRows();
    let cols = this.numCols();

    // Ignore egde cells
    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        let currentCell = this.currentBoard[row][col];
        if (currentCell) {
          let x = col * this.cellSize;
          let y = row * this.cellSize;

          circle(x + spacer, y + spacer, this.cellSize - spacer * 2);
        }
      }
    }
  }

  iterate() {
    let rows = this.numRows();
    let cols = this.numCols();

    // Ignore egde cells
    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        let currentCell = this.currentBoard[row][col];
        let numAliveNeighbours = this.unsafeNeighbourSum(row, col);
        if (numAliveNeighbours > 7) console.log(numAliveNeighbours);

        // Apply rules
        if (currentCell) {
          if (
            numAliveNeighbours < this.minRequiredNeighbours ||
            numAliveNeighbours > this.maxRequiredNeighbours
          ) {
            currentCell = false;
          }
        } else {
          if (numAliveNeighbours >= this.reproductionThreshold) {
            currentCell = true;
          }
        }

        this.nextBoard[row][col] = currentCell;
      }
    }

    // update board
    this.currentBoard = this.nextBoard;
  }

  safeNeighbourSum(row, col) {
    let sum = 0;
    let startRow = row > 0 ? row - 1 : 0;
    let startCol = col > 0 ? col - 1 : 0;
    let endRow = row < this.numRows() - 1 ? row + 1 : this.numRows() - 1;
    let endCol = row < this.numCols() - 1 ? col + 1 : this.numCols() - 1;

    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        sum += this.currentBoard[i][j];
      }
    }

    let sumWithoutSelf = sum - this.currentBoard[row][col];
    return sumWithoutSelf;
  }

  unsafeNeighbourSum(row, col) {
    let sum = 0;
    let startRow = row - 1;
    let startCol = col - 1;
    let endRow = row + 1;
    let endCol = col + 1;

    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        sum += this.currentBoard[i][j];
      }
    }

    let sumWithoutSelf = sum - this.currentBoard[row][col];
    return sumWithoutSelf;
  }

  numRows() {
    return this.currentBoard.length;
  }

  numCols() {
    if (this.currentBoard.length > 0) return this.currentBoard[0].length;
    else return 0;
  }

  screenToCell(x, y) {
    let row = Math.floor(y / this.cellSize);
    let col = Math.floor(x / this.cellSize);
    return { row: row, col: col };
  }

  setCell(row, col) {
    this.currentBoard[row][col] = true;
  }

  resize(width, height) {
    this.cellSize = min(width, height) / this.smallSideNum;

    let rows;
    let cols;
    if (width < height) {
      rows = Math.floor(height / this.cellSize);
      cols = this.smallSideNum;
    } else {
      rows = this.smallSideNum;
      cols = Math.floor(width / this.cellSize);
    }

    this.currentBoard = initArrayToFalse(rows, cols);
    this.nextBoard = initArrayToFalse(rows, cols);
  }
}

function initArrayToFalse(rows, columns) {
  let zeroArray = []; // new Array(rows);
  for (let i = 0; i < rows; i++) {
    let row = []; // new Array(columns);
    for (let j = 0; j < columns; j++) {
      row.push(false);
    }
    zeroArray.push(row);
  }
  return zeroArray;
}
