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
    let availableCoordinates = [];
    let occupiedCoordinates = [];

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        availableCoordinates.push([x, y]);
      }
    }
    for (const length of shipLengths) {
      let isVertical = Math.random() < 0.5;
      let maxAxis = BOARD_SIZE - length + 1;
      let axis = isVertical ? 0 : 1;
      let otherAxis = isVertical ? 1 : 0;

      let currentCoordinates = availableCoordinates.filter(
        (coord) => coord[axis] < maxAxis,
      );

      occupiedCoordinates.forEach((shipCoord) => {
        currentCoordinates = currentCoordinates.filter((currentCoord) => {
          let axisDiff = shipCoord[axis] - currentCoord[axis];
          return !(
            currentCoord[otherAxis] === shipCoord[otherAxis] &&
            axisDiff < length &&
            axisDiff >= 0
          );
        });
      });

      let ship = new Ship(length);
      let randomOrigin = generateRandomCoordinate(currentCoordinates);
      if (currentCoordinates.length === 0) {
        return this.placeShipsRandom();
      }
      this.board.placeShip(ship, randomOrigin, isVertical);
      let coords = this.board.getShipCoordinates(ship);
      coords.forEach((coord) => {
        occupiedCoordinates.push(coord);
      });
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
    if (result !== "repeat") {
      this.availableCoordinates = this.availableCoordinates.filter(
        ([x, y]) => x !== coordinates[0] || y !== coordinates[1],
      );
    }

    return { result, ship };
  }
  chooseCoordinates(board) {
    if (this.hits.size > 0) {
      let targetShip = this.hits.entries().reduce((previous, current) => {
        if (previous[1].length > current[1].length) return previous;
        return current;
      });

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
    }
    const randomIndex = Math.floor(
      Math.random() * this.availableCoordinates.length,
    );

    return this.availableCoordinates[randomIndex];
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

function generateRandomCoordinate(coordsList) {
  const randomIndex = Math.floor(Math.random() * coordsList.length);

  return coordsList[randomIndex];
}

export { Player, CPU };
