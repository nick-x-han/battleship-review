import { BOARD_SIZE, Gameboard } from "./gameboard.js";
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
    this.hits = new Map();
    this.availableCoordinates = [];

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        this.availableCoordinates.push([x, y]);
      }
    }
  }

  attack(player, coordinates) {
    let { result, ship } = super.attack(player, coordinates);
    if (result === "hit") {
      if (!this.hits.has(ship)) {
        this.hits.set(ship, []);
      }
      this.hits.get(ship).push(coordinates);
      if (ship.isSunk()) {
        this.hits.delete(ship);
      }
    }

    return { result, ship };
  }
  chooseCoordinates(board) {
    if (this.hits.size === 0) return generateRandomCoordinates();
    console.log(this.hits);
    let targetShip = this.hits.entries().reduce((previous, current) => {
      if (previous[1].length > current[1].length) return previous;
      return current;
    });
    console.log(targetShip);
    let [ship, coords] = targetShip;
    let axis = board.isVertical(ship) ? 0 : 1;
    coords.sort((a, b) => {
      if (a[axis] > b[axis]) return 1;
      if (a[axis] === b[axis]) return 0;
      if (a[axis] < b[axis]) return -1;
    });
    let directions;
    if (coords.length > 1) {
      let leftTop = coords[0];
      let rightBottom = coords.at(-1);
      if (board.isVertical(ship)) {
        directions = [
          [leftTop[0] - 1, leftTop[1]],
          [rightBottom[0] + 1, rightBottom[1]],
        ];
      } else {
        directions = [
          [leftTop[0], leftTop[1] - 1],
          [rightBottom[0], rightBottom[1] + 1],
        ];
      }
    } else {
      const [x, y] = coords[0];
      directions = [
        [x - 1, y],
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
      ];
    }

    if (directions) {
      directions = directions.filter((coord) =>
        checkValidTarget(board.board, coord),
      );
      if (directions.length > 0) {
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
      }
    }
    console.log("OOPS");
    return generateRandomCoordinates();
  }
}

function checkValidTarget(board, coord) {
  let x = coord[0];
  let y = coord[1];
  if (x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE) {
    if (board[x][y] !== -1 && board[x][y] !== 1) return true;
  }
  return false;
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
