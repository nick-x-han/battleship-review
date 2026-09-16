import { BOARD_SIZE } from "./gameboard.js";
import "./styles.css";

const squareSide = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--cell-size"),
);
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
  renderShips(player, parent);
  if (!parent.classList.contains("playing")) enableShipDragging(player, parent);
}

export function renderShips(player, parent) {
  let previousOutlines = parent.querySelectorAll(".ship-outline");
  previousOutlines.forEach((outline) => {
    outline.remove();
  });
  for (let ship of player.board.getShips()) {
    let shipObject = document.createElement("div");
    const coords = player.board.getShipCoordinates(ship);
    shipObject.style.width = `${squareSide}px`;
    shipObject.style.height = `${squareSide}px`;
    if (coords.length > 1) {
      let isVertical = coords[1][0] - coords[0][0] === 0 ? false : true;
      if (isVertical) {
        shipObject.style.height = `${squareSide * coords.length}px`;
      } else {
        shipObject.style.width = `${squareSide * coords.length}px`;
      }
    }

    let origin = coords[0];
    shipObject.style.left = `${origin[1] * squareSide}px`;
    shipObject.style.top = `${origin[0] * squareSide}px`;
    shipObject.classList.add("ship-outline");
    shipObject.info = { ship };

    parent.append(shipObject);
  }
}

function enableShipDragging(player, parent) {
  let grabX;
  let grabY;
  let grabbed;
  parent.onpointerdown = (e) => {
    if (!e.target.classList.contains("ship-outline")) return;

    parent.setPointerCapture(e.pointerId);
    const rect = e.target.getBoundingClientRect();

    grabX = e.clientX - rect.left;
    grabY = e.clientY - rect.top;
    grabbed = e.target;
  };
  parent.onpointermove = (e) => {
    if (!grabbed) return;

    const boardRect = parent.getBoundingClientRect();

    const mouseX = e.clientX - boardRect.left;
    const mouseY = e.clientY - boardRect.top;

    let x = mouseX - grabX;
    let y = mouseY - grabY;
    grabbed.style.left = `${Math.round(x / squareSide) * squareSide}px`;
    grabbed.style.top = `${Math.round(y / squareSide) * squareSide}px`;
  };
  parent.onpointerup = () => {
    if (!grabbed) return;
    const column = parseFloat(grabbed.style.left) / squareSide;
    const row = parseFloat(grabbed.style.top) / squareSide;
    try {
      let ship = grabbed.info.ship;
      let coords = player.board.getShipCoordinates(ship);
      let isVertical =
        coords.length > 1 && coords[1][0] - coords[0][0] === 0 ? false : true;
      player.board.repositionShip(ship, [row, column], isVertical);
    } catch (error) {
      console.log(error);
    } finally {
      grabbed = null;
      renderShips(player, parent);
    }
  };
}
