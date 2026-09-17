import {
  editMessage,
  renderBoard,
  renderShips,
  stopInteractivity,
  toggleClasses,
  updateCell,
} from "./display.js";
import { generateRandomCoordinates } from "./gameboard.js";

const BOARD_SIZE = 10;
const modal = document.querySelector("dialog");

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


  endGame() {
    stopInteractivity(this.player1.dom);
    stopInteractivity(this.player2.dom);
  }

  startGame() {
    this.player1.dom.classList.add("playing");
    this.player2.dom.classList.add("playing");
    editMessage(`Game started. ${this.activePlayer.name}'s turn.`);
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
        renderShips(enemy, enemy.dom);
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
    if (!enemy.isCPU && !this.activePlayer.isCPU) modal.showPopover();
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
