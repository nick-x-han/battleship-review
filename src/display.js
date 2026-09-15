import "./styles.css";
import { BOARD_SIZE } from "./gameboard.js";

const lastMoveDiv = document.querySelector("#lastMove");

export function editMessage(message) {
  lastMoveDiv.textContent = message;
}

export function stopInteractivity(domObject) {
  domObject.onclick = null;
  domObject.classList.remove("interactable");
}

export function toggleClasses(player, enemy) {
  if (!player.isCPU) enemy.dom.classList.add("interactable");
  player.dom.classList.remove("interactable");
  player.dom.classList.remove("enemy");
  enemy.dom.classList.add("enemy");
  //prevents CPU from showing its ships
  if (!player.isCPU) player.dom.classList.add("player");
  //against CPU, human's ships will continue displaying
  if (!player.isCPU) enemy.dom.classList.remove("player");
}

export function updateCell(cell, value) {
  if (value === -1) {
    cell.classList.add("missed");
  } else if (value === 1) {
    cell.classList.add("hit");
  } else if (value !== 0) {
    cell.classList.add("ship");
  }
}

export function renderBoard(player) {
  let boardDiv = document.createElement("div");

  boardDiv.classList.add("board");
  appendCells(player, boardDiv);
  return boardDiv;
}

export function appendCells(player, parent) {
  let board = player.board.board;
  parent.replaceChildren();
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let cell = document.createElement("div");
      let value = board[i][j];
      if (value instanceof Object) {
        cell.classList.add("ship");
      }

      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.column = j;

      parent.append(cell);
    }
  }
  adjustShipBorders(player.board, parent);
}

function adjustShipBorders(board, cellsParent) {
  let coords = [];
  let ships = board.getShips();
  for (let ship of ships) {
    coords.push(board.getShipCoordinates(ship));
  }

  for (let shipCoords of coords) {
    editBorders(shipCoords, cellsParent);
  }
}

function editBorders(coords, cellsParent) {
  if (coords.length === 1) return;
  let isVertical = coords[0][0] - coords[1][0] === 0 ? false : true;

  for (let i = 0; i < coords.length; i++) {
    let index = +coords[i][0] * BOARD_SIZE + +coords[i][1];
    let cell = cellsParent.children[index];
    if (i !== 0) {
      if (isVertical) cell.classList.add("top-edge");
      else cell.classList.add("left-edge");
    }
    if (i < coords.length - 1) {
      if (isVertical) cell.classList.add("bottom-edge");
      else cell.classList.add("right-edge");
    }
  }
}
