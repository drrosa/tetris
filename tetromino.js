export default class Tetromino {
  constructor(board) {
    this.board = board;
    this.spawn();
  }

  static TETROMINOS = [
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
  ];

  static COLORS = [
    'white',
    'cyan',
    'blue',
    'orange',
    'red',
    'green',
    'purple',
    'yellow',
  ];

  spawn() {
    const idx = Math.floor(Math.random() * Tetromino.TETROMINOS.length);
    this.shape = Tetromino.TETROMINOS[idx];
    this.x = 4;
    this.y = 0;
    this.render();
  }

  render() {
    this.board.fillStyle = 'red';
    this.board.fillRect(this.x, this.y, this.shape.length, this.shape.length);
  }
}
