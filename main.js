import GameManager from "./game-manager.js";
import TetrominoFactory from "./tetromino-factory.js";

const config = { //configurações do jogo
    width: 960,
    height: 540,
    columns: 10,
    lines: 20,
    squareSize: 25,
    nextPieceQueueSize: 3,
    initialPieceFallInMilliseconds: 1000,
    pieceFallIntervalDecay: 0.9,
};

GameManager.start(config);

const tetrominoFactory = new TetrominoFactory(); // Criar uma instância de TetrominoFactory
const tetromino = tetrominoFactory.getTetromino(); // Obter um tetromino

GameManager.start(config, tetromino); // Iniciar o jogo com as configurações e o tetromino
