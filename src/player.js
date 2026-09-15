import { Gameboard } from "./gameboard.js";

class Player {
  constructor(isCPU) {
    this.board = new Gameboard();
    this.isCPU = isCPU;
  }

  attack(player, coordinates) {
    return player.board.receiveAttack(coordinates);
  }
}

export { Player };
