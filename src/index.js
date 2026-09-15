import { GameInfo } from "./gameInfo.js";
import { Player } from "./player.js";

const player1 = new Player("Human", false);
const player2 = new Player("CPU", true);
let game = new GameInfo(player1, player2);
game.startGame();

//ship placing is its own class? 