import Tetromino from "./tetromino.js";

export default class TetrominoFactory {
  constructor() {
    this._collection = [
      () => new Tetromino(
        
        "#aeddaa",
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0]
        ]
      ),
      () => new Tetromino(
  
        "#2626e9",
        [
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0]
        ]
      ),
      () => new Tetromino(
        
        "#b91635",
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0]
        ]
      ),
      () => new Tetromino(
        
        "#f0c70d",
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ]
      ),
      () => new Tetromino(
      
        "#03a310",
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]
        ]
      )
    ];
  }
  getTetromino() {
    const randomIndex = Math.floor(Math.random() * this._collection.length);
    return this._collection[randomIndex]();
  }
}