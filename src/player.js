import { Gameboard } from "./gameboard";

class Player {
  constructor() {
    this.board = new Gameboard();
  }

  attack(player, coordinates) {
    player.board.receiveAttack(coordinates);
  }
}

export { Player };
