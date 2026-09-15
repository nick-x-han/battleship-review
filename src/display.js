import "./styles.css";

const BOARD_SIZE = 10;




export function renderBoard(player) {
  let boardDiv = document.createElement("div");

  boardDiv.classList.add("board");
  appendAndReplaceCells(player, boardDiv);
  return boardDiv;
}

export function appendAndReplaceCells(player, parent) {
  let board = player.board.board;
  parent.replaceChildren();
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let cell = document.createElement("div");
      let value = board[i][j];
      if (value === -1) {
        cell.classList.add("missed");
      } else if (value === 1) {
        cell.classList.add("hit");
      } else if (value !== 0) {
        cell.classList.add("ship");
      }

      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.column = j;

      parent.append(cell);
    }
  }
}






//placement UI will be each of the 10 ships 
//having a form, and each its own confirm
//button to make checking overlaps easier
//OR just show only human board 

//random placements function; used for both cpu and also
//is an option for player if needed
