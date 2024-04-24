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
    this._squares = [...Array(this._lines)].map(() => [...Array(this._columns)]);
    
    this.currentPiece = GameManager.tetrominoFactory.getTetromino();
    this._setCurrentpieceIntervalPosition();
    this._currentPieceFallInterval = setInterval(() => this._currentPieceFall(), GameManager.config.initialPieceFallInMilliseconds);

  }

  _setCurrentpieceIntervalPosition() {
    this.currentPiece.position = {
      x: (this._columns - 4) /2,
      y: 0
    }
  }

  levelUp(newLevel) {
    clearInterval(this._currentPieceFallInterval);
    this._currentPieceFallInterval = setInterval(
      this._currentPieceFall.bind(this), 
      GameManager.config.initialPieceFallInMilliseconds * Math.pow(GameManager.config.pieceFallIntervalDecay, newLevel - 1) // função para diminuir o tempo de queda
    );
  }

  _currentPieceFall() {//Função para verificar se as peças podem continuar a cair

    if (!GameManager.inPause && !GameManager.arena.currentPiece.tryMoveDown()) {//caso o metodo não currentPiece não coseguiu andar para baixo ele recebe uma nova instrução no setPosition
      GameManager.arena.currentPiece.margeToArena();
      const removedLines = GameManager.arena.removeCompletedLines();
      GameManager.score.addCompletedLines(removedLines);
      
      GameManager.arena.currentPiece = GameManager.nextPieceQueue.pop();
      GameManager.arena._setCurrentpieceIntervalPosition();
    }
  }

  isOutsideBoundaries(i, j, piece) {//metodo para fazer a peça parar sobre outra
    return (piece.position.y +j) >= this._lines
    || (piece.position.x + i) >= this._columns
    || (piece.position.x + i) < 0;
  }

  conflicts(i, j, piece) {//metodo para verificar se à outra peça na mesma posição 
    return this._squares[piece.position.y + j][piece.position.x + i];
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
    if (completedLines.length == 0) {
      return 0;
    }

    for (let i = completedLines.length - 1; i >= 0; i--) {
      this._squares.splice(completedLines[i], 1);
    }
    
    for (let i =0; i < completedLines.length; i++) {
      this._squares.unshift([...Array(this._columns)]);
    }

    return completedLines.length;
  }
}