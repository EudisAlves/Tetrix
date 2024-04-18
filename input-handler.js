import GameManager from "./game-manager.js";

export default class InputHandler {
  constructor() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  onKeyDown(e) {
    switch (e.code) {//metodo para simplificar a codificação de teclas
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
        while (GameManager.arena.currentPiece.tryMoveDown());
        break;
    }
  }
}