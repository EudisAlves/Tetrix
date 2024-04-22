import GameManager from "./game-manager.js";
import Square from "./square.js";

export default class Polyomino {
  constructor(squaresCount, color, format) {
    this.color = color;
    this._squaresCount = squaresCount;
    this._initializeSquares(format);

  }
  _initializeSquares(format) {
    this._squares = [...Array(this._squaresCount)].map(() => [...Array(this._squaresCount)]);

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (format[i][j]) {
          this._squares[i][j] = new Square(this.color);
        }
      }
    }
  }

  draw() {
    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j]) {
          this._squares[i][j].draw(
            GameManager.arena.position.left + (this.position.x + i) * GameManager.config.squareSize,
            GameManager.arena.position.top + (this.position.y + j) * GameManager.config.squareSize
          );
        }
      }
    }
  }

  setPosition(x, y) {//metodo para fazer os tetrominos aparecer de forma aleatoria
    this.position = {
      x: x,
      y: y
    };
    return this;
  }

  clone() {
    return new Polyomino(
      this._squaresCount,
      this.clone,
      this._squares.map(x => x.map(y => y ? 1 : 0))
    ).setPosition(this.position.x, this.position.y);
  }

  tryMoveLeft() {
    let copy = this.clone();
    copy.position.x--;

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j] && (GameManager.arena.isOutsideBoundaries(i, j, copy) || GameManager.arena.conflicts(i, j, copy))) {
          return false;
        }
      }
    }
    this.position.x--;//caso a peça não tenha nenhum impedimento ela move-se para baixo

    return true;
  }

  tryMoveRight() {
    let copy = this.clone();
    copy.position.x++;

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j] && (GameManager.arena.isOutsideBoundaries(i, j, copy) || GameManager.arena.conflicts(i, j, copy))) {
          return false;
        }
      }
    }
    this.position.x++;//caso a peça não tenha nenhum impedimento ela move-se para baixo

    return true;
  }

  tryMoveDown() {//metodo para executar a quedas de peças e verificar se tem espaço para cair
    let copy = this.clone();
    copy.position.y++;

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j] && (GameManager.arena.isOutsideBoundaries(i, j, copy) || GameManager.arena.conflicts(i, j, copy))) {
          return false;
        }
      }
    }
    this.position.y++;//caso a peça não tenha nenhum impedimento ela move-se para baixo

    return true;
  }

  tryRotateAntiClockwise() {//metodo para rodar a peça
    let copy = this.clone();

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        copy._squares[i][j] = this._squares[this._squaresCount - j - 1][i];
      }
    }

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j] && (GameManager.arena.isOutsideBoundaries(i, j, copy) || GameManager.arena.conflicts(i, j, copy))) {
          return false;
        }
      }
    }

    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        this._squares[i][j] = copy._squares[i][j];
      }
    }

    return true;
  }

  margeToArena() {
    for (let i = 0; i < this._squaresCount; i++) {
      for (let j = 0; j < this._squaresCount; j++) {
        if (this._squares[i][j]) {
          GameManager.arena.setSquare(this.position.y + j, this.position.x + i, this._squares[i][j]);
        }
      }
    }
  }

}