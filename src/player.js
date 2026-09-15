import { Gameboard, generateRandomCoordinates } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player {
  constructor(name, isCPU) {
    this.name = name;
    this.board = new Gameboard();
    this.isCPU = isCPU;
  }

  attack(player, coordinates) {
    return player.board.receiveAttack(coordinates);
  }

  placeShipsRandom() {
    let shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    while (shipLengths.length > 0) {
      let isVertical = Math.random() < 0.5;
      let [x, y] = generateRandomCoordinates(shipLengths[0] - 1, isVertical);
      try {
        let ship = new Ship(shipLengths[0]);
        this.board.placeShip(ship, [x, y], isVertical);
        shipLengths.shift();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export { Player };
