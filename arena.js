import GameManager from "./game-manager.js";
import Square from "./square.js";
import TetrominoFactory from "./tetromino-factory.js";


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
    this._squares = [...Array(this._columns)].map(() => [...Array(this._lines)]);
    
    this.currentPiece = new TetrominoFactory().getTetromino().setPosition(1, 3);
    this._currentPieceFallInterval = setInterval(this._currentPieceFall, 1000);
  }

  _currentPieceFall() {//Função para verificar se as peças podem continuar a cair

    if (!GameManager.arena.currentPiece.tryMoveDown()) {//caso o metodo não currentPiece não coseguiu andar para baixo ele recebe uma nova instrução no setPosition
      GameManager.arena.currentPiece.margeToArena();
      GameManager.arena.currentPiece = new TetrominoFactory().getTetromino().setPosition(1, 3);
    }
  }

  isOutsideBoundaries(i, j, piece) {//metodo para fazer a peça parar sobre outra
    return (piece.position.y +j) >= this._lines
    || (piece.position.x + i) >= this._columns
    || (piece.position.x + i) < 0;
  }

  conflicts(i, j, piece) {//metodo para verificar se à outra peça na mesma posição 
    return this._squares[piece.position.x + i][piece.position.y + j]
  }

  setSquare(i, j, square) { //chamada de margem
    this._squares[i][j] = square;
  }

  draw() {
    this._drawBorder();
    this._drawGrid();
    this._drawSquares();
    this.currentPiece.draw();
  }

  _drawBorder() {//metodo para desenhar a bordas
    GameManager.context.strokeStyle = "#000000";
    GameManager.context.strokeRect(
      this.position.left,
      this.position.top,
      this._width,
      this._height
    );
  }
  _drawSquares() {
    for (let i = 0; i < this._columns; i++) {
      for (let j = 0; j < this._lines; j++) {
        if (this._squares[i][j]) {    
          this._squares[i][j].draw(
            this.position.left + i * GameManager.config.squareSize,
            this.position.top + j * GameManager.config.squareSize
          );
        }
      }
    }
  }

  _drawGrid() {//Metodo para desenhar a grade dos blocos
    
    //beginPath: metodo que diz que ira começar a desenhar uma sequencias de linhas
    //moveTo: metodo diz de onde a linha começar
    //lineTo: metodo que diz onde a linha vai terminar
    //stroke: metodo para desenhar tudo que foi dito nos metodos moveTo e lineTo
    
    GameManager.context.strokeStyle = "#eeffee";
    GameManager.context.beginPath();
    for (let i = 1; i< this._lines; i++) {
      GameManager.context.moveTo(this.position.left, this.position.top + GameManager.config.squareSize * i);
      GameManager.context.lineTo(this.position.left + this._width , this.position.top + GameManager.config.squareSize * i);
    }
    for (let i = 1; i< this._columns; i++) {
      GameManager.context.moveTo(this.position.left + GameManager.config.squareSize * i, this.position.top);
      GameManager.context.lineTo(this.position.left + GameManager.config.squareSize * i, this.position.top + this._height);
    }
    
    GameManager.context.stroke();
  }
}