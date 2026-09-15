import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name, isCPU) {
    this.name = name;
    this.board = new Gameboard();
    this.isCPU = isCPU;
  }

  attack(player, coordinates) {
    return player.board.receiveAttack(coordinates);
  }
}

export { Player };
