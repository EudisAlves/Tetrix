import GameManager from "./game-manager.js";

export default class InputHandler {
  constructor() {
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener("keydown", this.onKeyDown);
  }
  onKeyDown(e) {
    switch (e.code) {//metodo para simplificar a codificação de teclas
      case "KeyW":
        GameManager.arena.currentPiece.tryRotateAntiClockwise();
        break;
      case "KeyA":
        GameManager.arena.currentPiece.tryMoveLeft();
        break;
      case "KeyD":
        GameManager.arena.currentPiece.tryMoveRight();
        break;
      case "KeyS":
        GameManager.arena.currentPiece.tryMoveDown();
        break;
      case "Space":
        let dropHeight = 0;
        while (GameManager.arena.currentPiece.tryMoveDown()) {
          dropHeight++;
        }
        GameManager.score.addDropBonus(dropHeight);
        break;
      case "Escape":
        GameManager.inPause = !GameManager.inPause;
    }
  }
}