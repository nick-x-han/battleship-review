import { Player } from "./player.js";
import "./styles.css"

const contentDiv = document.querySelector("#content");
const BOARD_SIZE = 10;
const PLAYER_ID = [1, 2];

export function playGame () {
  let player = new Player();
  let cpu = new Player();
  let playerTurn = PLAYER_ID[0];

  renderBoard(player, PLAYER_ID[0]);
  renderBoard(cpu, PLAYER_ID[1]);

  
}

function renderBoard(player, playerID) {
  let board = player.board.board;
  let boardDiv = document.createElement("div");
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let cell = document.createElement("div");
      let value = board[i][j];
      if (value === -1) {
        cell.textContent = "X";
      }
      else if (value === 1) {
        cell.textContent = "O";
      }
      else if (value !== 0) {
        cell.classList.add("ship");
      }

      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.column = j;

      boardDiv.classList.add("board");
      boardDiv.dataset.playerID = playerID;
      boardDiv.append(cell);
    }
  }
  contentDiv.append(boardDiv);
}