import GameManager from "./game-manager";

export default class Arena {
  constructor() {
    this._columns = GameManager.config.columns;
    this._lines = GameManager.config.lines
    this._width = this._lines * GameManager.config.squaresSize;
    this._height = this._columns * GameManager.config.squaresSize;
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

  _drawBorder() {
    GameManager.context.strokeStyle = "#000000";
    GameManager.context.strokeReact(
      this.position.left,
      this.position.top,
      this._width,
      this._height
    );
  }
}