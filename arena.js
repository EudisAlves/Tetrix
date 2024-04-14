import GameManager from "./game-manager.js";

export default class Arena {
  constructor() {
    this._columns = GameManager.config.columns;
    this._lines = GameManager.config.lines
    this._width = this._columns * GameManager.config.squareSize;
    this._height  = this._lines * GameManager.config.squareSize;
    this.position = {
      top: (GameManager.config.height - this._height) / 2,
      left: (GameManager.config.width - this._width) / 2,
    }
  }
  draw() {
    this._drawBorder();
    //_drawSquares()
    //_drawGrid()
  }

  _drawBorder() {//metodo para desenhar a borda
    GameManager.context.strokeStyle = "#000000";
    GameManager.context.strokeRect(
      this.position.left,
      this.position.top,
      this._width,
      this._height
    );
  }
}