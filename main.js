        /*----- constants -----*/


        /*----- app's state (variables) -----*/
let game;


        /*----- cached element references -----*/
let canvasEl = document.getElementById("board-canvas");
let spanEl = document.getElementById("score");
let smallCanvasEl = document.getElementById("next-piece-canvas");
let h2El = document.getElementById("message");


        /*----- event listeners -----*/


        /*----- classes -----*/
class TetrisGame {
    constructor(canvasEl, spanEl, smallCanvasEl, h2El) {
        this.boardEl = canvasEl;
        this.scoreEl = spanEl;
        this.nextPieceEl = smallCanvasEl;
        this.msgEl = h2El;
        this.boardDisplay = canvasEl.getContext("2d");
        this.nextPieceDisplay = smallCanvasEl.getContext("2d");
    }
}


        /*----- functions -----*/
init();

function init() {
    game = new TetrisGame(canvasEl, spanEl, smallCanvasEl, h2El);
}
