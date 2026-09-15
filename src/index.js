import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews();


//change appendCells method so that on player turn won't show enemy's ships
  //PARTIALLY DONE????

//for ship choosing, add a view to a list and call the choose positions view
//for each player in that list if it's a human.
//make it show the live positions of each ship, and confirm button doens't work
//if any overlaps or out of bounds
//each ship will just have a section for its length and then for each ship of that
//length just have two number inputs, with live updating on the board
  //live updating: onchange (so whenever a coordinate input is updated)


//DO CELLS DRAWING AT BEGINNING OF TURN NOT END
  //but only if redrawing both boards (might be needed)

//OR USE classes + children (like enemy > ship) and toggle in startTurn


//rerender each board after each switchPlayer so that active player always on left?
  //WHAT IF don't do reremders at all; each cell updates itself with classes?

//no adjacent ships?
  //separate validateBoard in gameboard?

//remove appendCells from gameinfo's placeship because will do first and only
//append cells after ships are placed (maybe?)
  //this should work with creting a gameboard just for placing ships or whatever
  //since appendCells only displays ships now 


//a ship doesn't have internal borders
  //can do trick with div + empty spans? (to maintain indexes)
    //must maintain target.dataset.rows
  //MAYBE ON EVERY turn switch, just check for all ships and display them in
  //the hacky way (or have to fix the adjacent thing)
  //MAYBE ON APPENDCELLS, immediately do a second pass replacing things with the 
  //actual ship representation (hack). 

  //actually just have function that can for each cell calc where it is in the 
  //ship and then remove specific borders programmatically? 
    //so need to iterate over the .coords
      //woulnd't need to track sunk ships b/c each ship will already have their
      //classLists, so its' one and done