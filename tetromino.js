export default class Tetromino {
  static #SHAPES = Object.freeze([
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
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
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    [
      [1, 1],
      [1, 1],
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

  constructor() {
    this.#spawn(Tetromino.#SHAPES, Tetromino.#COLORS);
  }

  #spawn(shapes, colors) {
    const idx = Math.floor(Math.random() * shapes.length);
    this.shape = shapes[idx];
    this.color = colors[idx];
    this.#x = 4;
    this.#y = 0;
  }

  render(canvasCtx) {
    this.shape.forEach((row, j) => {
      row.forEach((block, i) => {
        // eslint-disable-next-line no-param-reassign
        canvasCtx.fillStyle = block ? this.color : '#15171b';
        canvasCtx.fillRect(this.#x + i, this.#y + j, 1, 1);
      });
    });
  }
}
