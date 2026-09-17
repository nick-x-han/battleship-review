import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.isCPU = false;
  }

  attack(player, coordinates) {
    return player.board.receiveAttack(coordinates);
  }

  placeShipsRandom() {
    this.resetShips();
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

  resetShips() {
    this.board = new Gameboard();
  }
}

class CPU extends Player {
  constructor(name) {
    super(name);
    this.isCPU = true;
    this.hits = []; 
  }

  registerHit() {
    
  }
  chooseAttack() {


    return generateRandomCoordinates();
  }
}

export function generateRandomCoordinates(offset = 0, isVertical = true) {
  let bottomOffset = 0;
  let rightOffset = 0;
  if (isVertical) bottomOffset = offset;
  else rightOffset = offset;

  let x = Math.floor(Math.random() * (10 - bottomOffset));
  let y = Math.floor(Math.random() * (10 - rightOffset));
  return [x, y];
}

export { Player, CPU };
