import { Gameboard } from "./gameboard.js";

class Player {
  constructor(isCPU) {
    this.board = new Gameboard();
    this.cpu = isCPU;
  }

  attack(player, coordinates) {
    player.board.receiveAttack(coordinates);
  }
}

export { Player };
