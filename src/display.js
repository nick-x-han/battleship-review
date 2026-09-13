import { Player } from "./player.js";
import "./styles.css";

const contentDiv = document.querySelector("#content");
const BOARD_SIZE = 10;

export function playGame() {
  let player = new Player();
  let cpu = new Player();

  const humanBoardDiv = renderBoard(player);
  const cpuBoardDiv = renderBoard(cpu, true);
  cpuBoardDiv.addEventListener("click", (e) => onClickEnemyBoard(e, player));

  contentDiv.append(humanBoardDiv, cpuBoardDiv);
}

function renderBoard(player, isCPU) {
  let boardDiv = document.createElement("div");

  boardDiv.classList.add("board");
  appendAndReplaceCells(player, boardDiv, isCPU);
  return boardDiv;
}

function appendAndReplaceCells(player, parent, isCPU) {
  let board = player.board.board;
  parent.replaceChildren();
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let cell = document.createElement("div");
      let value = board[i][j];
      if (value === -1) {
        cell.textContent = "X";
      } else if (value === 1) {
        cell.textContent = "O";
      } else if (value !== 0) {
        cell.classList.add("ship");
      }

      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.column = j;

      if (isCPU) {
        cell.classList.add("interactable");
      }

      parent.append(cell);
    }
  }
}

function onClickEnemyBoard(e, cpu) {
  let x = e.target.dataset.row;
  let y = e.target.dataset.column;
  cpu.board.receiveAttack([x, y]);

  appendAndReplaceCells(cpu, e.currentTarget, true);
}

function enemyMove() {}
