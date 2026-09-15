import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews();


//change appendCells method so that on player turn won't show enemy's ships

//for ship choosing, add a view to a list and call the choose positions view
//for each player in that list if it's a human.
//make it show the live positions of each ship, and confirm button doens't work
//if any overlaps or out of bounds
//each ship will just have a section for its length and then for each ship of that
//length just have two number inputs, with live updating on the board


//DO CELLS DRAWING AT BEGINNING OF TURN NOT END
  //but only if redrawing both boards (might be needed)

//OR USE classes + children (like enemy > ship) and toggle in startTurn

//need to track each ship's actual positions

//rerender each board after each switchPlayer so that active player always on left?
  //WHAT IF don't do reremders at all; each cell updates itself with classes?

//no adjacent ships?
  //separate validateBoard in gameboard?