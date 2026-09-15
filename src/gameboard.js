const BOARD_SIZE = 10;
const FLEET_SIZE = { 1: 4, 2: 3, 3: 2, 4: 1 };

class Gameboard {
  #board;
  #ships;
  #fleetCounts;
  constructor() {
    this.#board = [];
    this.#ships = [];
    this.#fleetCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    this.sunkShips = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.#board.push(new Array(BOARD_SIZE).fill(0, 0, BOARD_SIZE));
    }
  }

  getShipCoordinates() {
    let coords = []
    for (let ship of this.#ships) {
      coords.push(ship.coords);
    }
    return coords;
  }

  #validateFleetCount(length) {
    if (FLEET_SIZE[length] > this.#fleetCounts[length]) {
      return true;
    }
    return false;
  }

  #willOverlap(ship, origin, isVertical) {
    for (let i = 0; i < ship.getLength(); i++) {
      if (isVertical) {
        if (this.#board[origin[0] + i][origin[1]] !== 0) {
          return true;
        }
      } else {
        if (this.#board[origin[0]][origin[1] + i] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  #checkBounds(ship, origin, isVertical) {
    if (
      origin[0] < 0 ||
      origin[1] < 0 ||
      origin[0] >= BOARD_SIZE ||
      origin[1] >= BOARD_SIZE
    )
      return false;

    let vertical = isVertical ? 1 : 0;
    let horizontal = isVertical ? 0 : 1;
    if (origin[0] + ship.getLength() * vertical > BOARD_SIZE) return false;
    if (origin[1] + ship.getLength() * horizontal > BOARD_SIZE) return false;
    return true;
  }

  placeShip(ship, origin, isVertical = true) {
    if (ship.getLength() > 4) {
      throw new Error("Cannot place ships with length > 4");
    }
    if (this.#ships.includes(ship)) {
      throw new Error("Already placed this ship");
    }
    if (!this.#checkBounds(ship, origin, isVertical)) {
      throw new Error("Cannot place out-of-bounds ship");
    }
    if (!this.#validateFleetCount(ship.getLength())) {
      throw new Error(`Exceeded limit of ships of length ${ship.getLength()}`);
    }
    if (this.#willOverlap(ship, origin, isVertical)) {
      throw new Error("Cannot overlap onto another ship");
    }

    this.#ships.push(ship);
    this.#fleetCounts[ship.getLength()]++;

    let coords = [];

    for (let i = 0; i < ship.getLength(); i++) {
      let x;
      let y;
      if (isVertical) {
        x = origin[0] + i;
        y = origin[1];
        this.#board[origin[0] + i][origin[1]] = ship;
      } else {
        x = origin[0];
        y = origin[1] + i;
        this.#board[origin[0]][origin[1] + i] = ship;
      }
      this.#board[x][y] = ship;
      coords.push([x, y]);
    }

    ship.coords = coords;
  }

  receiveAttack(coordinates) {
    let [x, y] = coordinates;
    if (this.#board[x][y] === 0) {
      this.#board[x][y] = -1;
      return "miss";
    }
    if (this.#board[x][y] instanceof Object) {
      const ship = this.#board[x][y];
      ship.hit();
      this.#board[x][y] = 1;
      if (ship.isSunk()) {
        this.sunkShips++;
      }

      return "hit";
    }
    //if this coord was already attacked
    console.log("Already missed or succeeded here before");
    return "repeat";
  }

  isDefeated() {
    return this.sunkShips === this.#ships.length;
  }

  get board() {
    return this.#board;
  }
}

export { Gameboard };
