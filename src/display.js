import { Player } from "./player.js";
import "./styles.css";

const contentDiv = document.querySelector("#content");
const BOARD_SIZE = 10;
const PLAYER_INDEX = [0, 1];

export function playGame() {
  let player = new Player();
  let cpu = new Player();
  let players = [player, cpu];
  let playerTurn = PLAYER_INDEX[0];

  renderBoard(player, PLAYER_INDEX[0]);
  renderBoard(cpu, PLAYER_INDEX[1]);

  contentDiv.addEventListener("click", (e) => {
    const playerIndex = e.target.parentNode.dataset.playerID;
    if (playerIndex && playerIndex === playerTurn) {
      
    }
  });
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
      } else if (value === 1) {
        cell.textContent = "O";
      } else if (value !== 0) {
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
