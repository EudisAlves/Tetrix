import GameManager from "./game-manager.js"

export default class Score {
  constructor () {
    this.totalPoints = 0;
    this.totalLines = 0;
    this.level = 1;
  }

  addCompletedLines(completedLines) {
    this.totalLines += completedLines;
    this.totalPoints += completedLines * completedLines;
    const newLevel = Math.floor(this.totalLines / 10) +1;
    if (newLevel > this.level) {
      GameManager.levelUp(newLevel);
      this.level = newLevel;
    }
  }

  addDropBonus(dropHeight) {
    this.totalPoints += dropHeight;
  }

  draw() {
    const x = GameManager.arena.position.left + (GameManager.config.columns) * GameManager.config.squareSize;
    const y = GameManager.arena.position.top + 30;

    GameManager.context.textAlign = "start";
    GameManager.context.fillStyle = "#000000";

    GameManager.context.font = "30px Titillium Web";
    GameManager.context.fillText("Linhas", x + 30, y);
    GameManager.context.fillText("Pontos", x + 30, y + 80);
    GameManager.context.fillText("Level", x + 30, y + 160);

    GameManager.context.font = "bold 40px Titillium Web";
    GameManager.context.fillText(this.totalLines.toString(), x + 50, y + 30);
    GameManager.context.fillText(this.totalPoints.toString(), x + 50, y + 110);
    GameManager.context.fillText(this.level.toString(), x + 50, y + 190);
  }
}
