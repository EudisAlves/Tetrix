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
    this._drawGrid()
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

  _drawGrid() {//Metodod para desenhar a grade dos blocos

    //beginPath: metodo que diz que ira começar a desenhar uma sequencias de linhas
    //moveTo: metodo diz de onde a linha começar
    //lineTo: metodo que diz onde a linha vai terminar
    //storke: metodo para desenhar tudo que foi dito nos metodos moveTo e lineTo
  
    GameManager.context.strokeStyle = "#dedede";
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