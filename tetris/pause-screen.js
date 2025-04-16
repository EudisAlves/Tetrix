import GameManager from "./game-manager.js";

export default class PauseScreen {
  draw() {
    if (!GameManager.inPause) {
      return;
    }

    GameManager.context.globalAlpha = 0.5;
    GameManager.context.fillStyle = "#FFFFFF";
    GameManager.context.fillRect(
      0,
      0,
      GameManager.config.width,GameManager.config.height
    );
    GameManager.context.globalAlpha = 1.0;
    GameManager.context.textAlign = "center";
    GameManager.context.fillStyle = "#888888";
    GameManager.context.font = "bold 50px Titillium Web";
    GameManager.context.fillText("Pausa",GameManager.config.width / 2 , GameManager.config.height / 2);
  }
}