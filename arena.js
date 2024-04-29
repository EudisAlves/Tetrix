// arena.js
import GameManager from "./game-manager.js";

export default class Arena {
  constructor() {
    this._columns = GameManager.config.columns;
    this._lines = GameManager.config.lines;
    this._width = this._columns * GameManager.config.squareSize;
    this._height = this._lines * GameManager.config.squareSize;
    this.position = {
      top: (GameManager.config.height - this._height) / 2,
      left: (GameManager.config.width - this._width) / 2,
    };
    this._squares = Array.from({ length: this._lines }, () => Array(this._columns).fill(null));

    this.currentPiece = GameManager.tetrominoFactory.getTetromino();
    this._setCurrentPieceIntervalPosition();
    this._currentPieceFallInterval = setInterval(() => this._currentPieceFall(), GameManager.config.initialPieceFallInMilliseconds);
  }

  _setCurrentPieceIntervalPosition() {
    this.currentPiece.position = {
      x: Math.floor((this._columns - 4) / 2),
      y: 0
    };
  }

  levelUp(newLevel) {
    clearInterval(this._currentPieceFallInterval);
    this._currentPieceFallInterval = setInterval(
      () => this._currentPieceFall(),
      GameManager.config.initialPieceFallInMilliseconds * Math.pow(GameManager.config.pieceFallIntervalDecay, newLevel - 1)
    );
  }

  _currentPieceFall() {
    if (!GameManager.inPause) {
      if (!this.currentPiece.tryMoveDown()) {
        if (this.currentPiece.position.y <= 0) {
          GameManager.gameOver();
          return;
        }
        this.currentPiece.margeToArena();
        const removedLines = this.removeCompletedLines();
        GameManager.score.addCompletedLines(removedLines);
        this.currentPiece = GameManager.nextPieceQueue.pop();
        this._setCurrentPieceIntervalPosition();
      }
    }
  }

  isOutsideBoundaries(i, j, piece) {
    return (
      piece.position.y + j >= this._lines ||
      piece.position.x + i >= this._columns ||
      piece.position.x + i < 0
    );
  }

  conflicts(i, j, piece) {
    return this._squares[piece.position.y + j][piece.position.x + i];
  }

  setSquare(i, j, square) {
    this._squares[i][j] = square;
  }

  draw() {
    this._drawBorder();
    this._drawGrid();
    this._drawSquares();
    this.currentPiece.draw();
  }

  _drawBorder() {
    GameManager.context.strokeStyle = "#000000";
    GameManager.context.strokeRect(
      this.position.left,
      this.position.top,
      this._width,
      this._height
    );
  }

  _drawSquares() {
    for (let i = 0; i < this._lines; i++) {
      for (let j = 0; j < this._columns; j++) {
        if (this._squares[i][j]) {
          this._squares[i][j].draw(
            this.position.left + j * GameManager.config.squareSize,
            this.position.top + i * GameManager.config.squareSize
          );
        }
      }
    }
  }

  _drawGrid() {
    GameManager.context.strokeStyle = "#eeffee";
    GameManager.context.beginPath();
    for (let i = 1; i < this._lines; i++) {
      GameManager.context.moveTo(this.position.left, this.position.top + GameManager.config.squareSize * i);
      GameManager.context.lineTo(this.position.left + this._width, this.position.top + GameManager.config.squareSize * i);
    }
    for (let i = 1; i < this._columns; i++) {
      GameManager.context.moveTo(this.position.left + GameManager.config.squareSize * i, this.position.top);
      GameManager.context.lineTo(this.position.left + GameManager.config.squareSize * i, this.position.top + this._height);
    }
    GameManager.context.stroke();
  }

  removeCompletedLines() {
    let completedLines = [];

    for (let i = 0; i < this._lines; i++) {
      let completed = true;
      for (let j = 0; j < this._columns; j++) {
        if (!this._squares[i][j]) {
          completed = false;
          break;
        }
      }
      if (completed) {
        completedLines.push(i);
      }
    }
    if (completedLines.length === 0) {
      return 0;
    }

    completedLines.forEach(line => {
      this._squares.splice(line, 1);
      this._squares.unshift(Array(this._columns).fill(null));
    });

    return completedLines.length;
  }
}
