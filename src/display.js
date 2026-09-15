import "./styles.css";

const BOARD_SIZE = 10;

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

//placement UI will be each of the 10 ships
//having a form, and each its own confirm
//button to make checking overlaps easier
//OR just show only human board

//random placements function; used for both cpu and also
//is an option for player if needed
