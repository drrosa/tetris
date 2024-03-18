export default class Tetromino {
  static #SHAPES = Object.freeze([
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ],
  ]);

  static #COLORS = Object.freeze([
    'cyan',
    'blue',
    'orange',
    'red',
    'green',
    'purple',
    'yellow',
  ]);

  #x;

  #y;

  #shape;

  #color;

  constructor() {
    const idx = Math.floor(Math.random() * Tetromino.#SHAPES.length);
    this.#shape = Tetromino.#SHAPES[idx];
    this.#color = Tetromino.#COLORS[idx];
    // The ⎢ and □ tetrominoes spawn centrally;
    // the rest spawn in the left-middle columns.
    this.#x = idx === 0 || idx === 6 ? 3 : 1;
    this.#y = 0;
  }

  render(canvasCtx) {
    this.#shape.forEach((row, j) => {
      row.forEach((block, i) => {
        // eslint-disable-next-line no-param-reassign
        canvasCtx.fillStyle = block ? this.#color : '#15171b';
        canvasCtx.fillRect(this.#x + i, this.#y + j, 1, 1);
      });
    });
  }
}
