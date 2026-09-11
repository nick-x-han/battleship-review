const BOARD_SIZE = 10;
const FLEET_ONE = 4;
const FLEET_TWO = 3;
const FLEET_THREE = 2;
const FLEET_FOUR = 1;

function checkBounds(origin, isVertical, length) {
  let bound = isVertical ? origin[0] : origin[1];
}

function validateShipLength() {

}

class Gameboard {
  #board;
  #ships;
  #fleetCounts;
  constructor() {
    this.#board = [];
    this.#ships = [];
    this.#fleetCounts = { "1": 0, "2": 0, "3": 0, "4": 0 };
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.#board.push(new Array(BOARD_SIZE).fill(0, 0, BOARD_SIZE));
    }
  }

  placeShip(ship, origin, isVertical) {
    if (!checkBounds(origin, isVertical, ship.getLength())) {
      throw new Error("Cannot place out-of-bounds ship");
    }
    if (this.#ships.includes(ship)) {
      throw new Error("Already placed this ship");
    }
    this.#ships.push(ship);

    for (let i = 0; i < ship.getLength(); i++) {
      if (isVertical) {
        this.#board[origin[0] + i][origin[1]] = ship;
      } else {
        this.#board[origin[0]][origin[1] + i] = ship;
      }
    }
  }

  get board() {
    return this.#board;
  }
}

export { Gameboard };
