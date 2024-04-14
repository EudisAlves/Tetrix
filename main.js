import GameManager from "./game-manager.js";

const config = { //configurações do jogo
    width: 960,
    height: 540,
    columns: 10,
    lines: 20,
    squareSize: 25,
};

GameManager.start(config);