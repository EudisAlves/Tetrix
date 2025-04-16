import Polyomino from "./polyomino.js";

export default class Tetromino extends Polyomino {
  constructor(color, format) {
    super(4, color, format);//metodo para construir os tetromino
  }
}