import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.board = new Gameboard();
  }

  attack(player, coordinates) {
    player.board.receiveAttack(coordinates);
  }
}

export { Player };
