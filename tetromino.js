export default class Tetromino {
  /* ----- constants -----*/

  static #SHAPES = Object.freeze([
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    [
      [4, 4, 0],
      [0, 4, 4],
      [0, 0, 0],
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 0, 0],
    ],
  ]);

  static #COLORS = Object.freeze([
    '#15171b',
    'cyan',
    'blue',
    'orange',
    'red',
    'green',
    'purple',
    'yellow',
  ]);

  /* ----- state variables -----*/

  #shape;

  #x;

  #y;

  /* ----- methods -----*/

  constructor() {
    const idx = Math.floor(Math.random() * Tetromino.#SHAPES.length);
    this.#shape = Tetromino.#SHAPES[idx];
    // The even width tetrominoes (⎢ and □) spawn in the center;
    // the 3-cell wide tetrominoes spawn in the center of the left half.
    this.#x = (this.#shape[0].length % 2 === 0) ? 3 : 1;
    this.#y = -1;
  }

  moveDown() {
    this.#y += 1;
  }

  moveRight() {
    this.#x += 1;
  }

  moveLeft() {
    this.#x -= 1;
  }

  rotate() {
    // Transpose and reverse rows
    // to get a 90º rotation.
    const shape = [];
    this.#shape.forEach((row, i) => {
      shape.push([]);
      row.forEach((_, j) => {
        shape[i][j] = this.#shape[j][i];
      });
      shape[i].reverse();
    });
    this.#shape = shape;
  }

  render(canvasCtx) {
    this.#shape.forEach((row, y) => {
      row.forEach((blockColor, x) => {
        // eslint-disable-next-line no-param-reassign
        canvasCtx.fillStyle = Tetromino.#COLORS[blockColor];
        canvasCtx.fillRect(this.#x + x, this.#y + y, 1, 1);
      });
    });
  }
}
