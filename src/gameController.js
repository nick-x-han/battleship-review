import {
  appendCells,
  editMessage,
  renderBoard,
  stopInteractivity,
  toggleClasses,
  updateCell,
} from "./display.js";
import { generateRandomCoordinates } from "./gameboard.js";
import { Ship } from "./ship.js";

const contentDiv = document.querySelector("#content");
const BOARD_SIZE = 10;

export class GameController {
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
    stopInteractivity(this.player1.dom);
    stopInteractivity(this.player2.dom);
  }

  startGame() {
    this.player1.placeShipsRandom();
    this.player2.placeShipsRandom();

    appendCells(this.player1, this.player1.dom);
    appendCells(this.player2, this.player2.dom);
    editMessage(`Game started. ${this.activePlayer.name}'s turn.`);

    contentDiv.append(this.player1.dom, this.player2.dom);

    this.startTurn(this.player1, this.player2);
  }

  startTurn(player, enemy) {
    // swapDomPositions(player.dom, enemy.dom);
    toggleClasses(player, enemy);
    stopInteractivity(player.dom);

    if (player.isCPU) this.#cpuMove(enemy);
    else {
      enemy.dom.onclick = (e) => this.#onClickEnemyBoard(e, enemy);
    }
  }
  switchTurn() {
    let enemy = this.activePlayer;
    this.switchActivePlayer();
    this.startTurn(this.activePlayer, enemy);
  }

  async #makeMove(enemy, x, y) {
    x = Number(x);
    y = Number(y);
    let attack = enemy.board.receiveAttack([x, y]);
    if (attack.result === "repeat") {
      this.startTurn(this.activePlayer, enemy);
      return;
    } else {
      if (this.activePlayer.isCPU)
        await new Promise((resolve) => setTimeout(resolve, this.cpuMoveDelay));
    }
    editMessage(`${this.activePlayer.name} just attacked (${x}, ${y})`);

    let index = x * BOARD_SIZE + y;
    let cell = enemy.dom.children[index];
    let value = enemy.board.board[x][y];
    updateCell(cell, value);

    if (attack.result === "hit") {
      if (attack.ship.isSunk()) {
        let coords = enemy.board.getShipCoordinates(attack.ship);
        for (let coord of coords) {
          let index = +coord[0] * BOARD_SIZE + +coord[1];
          let shipCell = enemy.dom.children[index];
          shipCell.classList.add("sunk");
        }
      }
      if (enemy.board.isDefeated()) {
        editMessage(`${this.activePlayer.name} just won!`);
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
}
