import { appendAndReplaceCells, renderBoard } from "./display.js";
import { Ship } from "./ship.js";

const contentDiv = document.querySelector("#content");
const lastMoveDiv = document.querySelector("#lastMove");

export class GameInfo {
  constructor(player1, player2) {
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
    player.board.placeShip(ship, [0, 0]);

    appendAndReplaceCells(player, player.dom);
  }

  startGame() {
    this.placeShips(this.player2);
    this.placeShips(this.player1);

    contentDiv.append(this.player1.dom, this.player2.dom);

    this.startTurn(this.player1, this.player2);
  }

  startTurn(player, enemy) {
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

  #makeMove(enemy, x, y) {
    let outcome = enemy.board.receiveAttack([x, y]);
    if (outcome === "repeat") {
      this.startTurn(this.activePlayer, enemy);
      return;
    }
    lastMoveDiv.textContent = `${this.activePlayer.name} just attacked (${x}, ${y})`;
    appendAndReplaceCells(enemy, enemy.dom);
    this.switchTurn();
  }
  #cpuMove(enemy) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    
    this.#makeMove(enemy, x, y);
  }

  #onClickEnemyBoard(e, enemy) {
    let x = e.target.dataset.row;
    let y = e.target.dataset.column;
    this.#makeMove(enemy, x, y);
  }
}
