import { appendCells, renderBoard } from "./display.js";
import { Ship } from "./ship.js";

const contentDiv = document.querySelector("#content");
const lastMoveDiv = document.querySelector("#lastMove");
const BOARD_SIZE = 10;

export class GameInfo {
  constructor(player1, player2, cpuMoveDelay = 0) {
    this.cpuMoveDelay = cpuMoveDelay;
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = this.player1;

    this.player1.dom = renderBoard(this.player1);
    this.player2.dom = renderBoard(this.player2);
  }

  switchActivePlayer() {
    if (this.activePlayer === this.player1) {
      this.activePlayer = this.player2;
    } else {
      this.activePlayer = this.player1;
    }
  }

  placeShipsRandom(player) {
    let shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    while (shipLengths.length > 0) {
      let isVertical = Math.random() < 0.5;
      let [x, y] = generateRandomCoordinates(shipLengths[0] - 1, isVertical);
      try {
        let ship = new Ship(shipLengths[0]);
        player.board.placeShip(ship, [x, y], isVertical);
        shipLengths.shift();
      } catch (error) {
        console.log(error);
      }
    }
    appendCells(player, player.dom);
  }

  placeShips(player) {
    let ship = new Ship(3);
    let ship2 = new Ship(4);
    let ship3 = new Ship(1);
    player.board.placeShip(ship, [0, 0]);
    player.board.placeShip(ship2, [4, 0], true);
    player.board.placeShip(ship3, [9, 0], true);

    appendCells(player, player.dom);
  }

  endGame() {
    this.player1.dom.onclick = null;
    this.player2.dom.onclick = null;
    this.player1.dom.classList.remove("interactable");
    this.player2.dom.classList.remove("interactable");
  }

  startGame() {
    this.placeShipsRandom(this.player1);
    this.placeShipsRandom(this.player2);
    

    lastMoveDiv.textContent = `Game started. ${this.activePlayer.name}'s turn.`;

    contentDiv.append(this.player1.dom, this.player2.dom);

    this.startTurn(this.player1, this.player2);
  }

  #toggleClasses(player, enemy) {
    if (!player.isCPU) enemy.dom.classList.add("interactable");
    player.dom.classList.remove("interactable");
    player.dom.classList.remove("enemy");
    enemy.dom.classList.add("enemy");
    //prevents CPU from showing its ships
    if (!player.isCPU) player.dom.classList.add("player");
    //against CPU, human's ships will continue displaying
    if (!player.isCPU) enemy.dom.classList.remove("player");
  }

  startTurn(player, enemy) {
    // contentDiv.insertBefore(player.dom, enemy.dom);
    this.#toggleClasses(player, enemy);
    

    if (player.isCPU) this.#cpuMove(enemy);
    else {
      enemy.dom.onclick = (e) => this.#onClickEnemyBoard(e, enemy);
      player.dom.onclick = null;
    }
  }
  switchTurn() {
    let enemy = this.activePlayer;
    this.switchActivePlayer();
    this.startTurn(this.activePlayer, enemy);
  }

  async #makeMove(enemy, x, y) {
    let attack = enemy.board.receiveAttack([x, y]);
    if (attack.result === "repeat") {
      this.startTurn(this.activePlayer, enemy);
      return;
    } else {
      if (this.activePlayer.isCPU)
        await new Promise((resolve) => setTimeout(resolve, this.cpuMoveDelay));
    }
    lastMoveDiv.textContent = `${this.activePlayer.name} just attacked (${x}, ${y})`;

    this.updateCell(enemy, x, y);

    if (attack.result === "hit") {
      if (attack.ship.isSunk()) {
        let coords = enemy.board.getShipCoordinates(attack.ship);
        for (let coord of coords) {
          let index = +coord[0] * BOARD_SIZE + +coord[1];
          let cell = enemy.dom.children[index];
          cell.classList.add("sunk");
        }
      }
      if (enemy.board.isDefeated()) {
        lastMoveDiv.textContent = `${this.activePlayer.name} just won!`;
        this.endGame();
        return;
      }
      // a successful hit begets another turn
      this.startTurn(this.activePlayer, enemy);
      return;
    }
    this.switchTurn();
  }
  #cpuMove(enemy) {
    let [x, y] = generateRandomCoordinates();
    this.#makeMove(enemy, x, y);
  }

  #onClickEnemyBoard(e, enemy) {
    let x = e.target.dataset.row;
    let y = e.target.dataset.column;
    this.#makeMove(enemy, x, y);
  }

  updateCell(player, x, y) {
    x = Number(x);
    y = Number(y);
    let index = x * BOARD_SIZE + y;
    let cell = player.dom.children[index];
    let value = player.board.board[x][y];

    if (value === -1) {
      cell.classList.add("missed");
    } else if (value === 1) {
      cell.classList.add("hit");
    } else if (value !== 0) {
      cell.classList.add("ship");
    }
  }
}

function generateRandomCoordinates(offset = 0, isVertical = true) {
  let bottomOffset = 0;
  let rightOffset = 0;
  if (isVertical) bottomOffset = offset;
  else rightOffset = offset;

  let x = Math.floor(Math.random() * (10 - bottomOffset));
  let y = Math.floor(Math.random() * (10 - rightOffset));
  return [x, y];
}
