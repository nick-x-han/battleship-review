import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews();


//for ship choosing, add a view to a list and call the choose positions view
//for each player in that list if it's a human.
//make it show the live positions of each ship, and confirm button doens't work
//if any overlaps or out of bounds
//each ship will just have a section for its length and then for each ship of that
//length just have two number inputs, with live updating on the board
  //live updating: onchange (so whenever a coordinate input is updated)


//rerender each board after each switchPlayer so that active player always on left?
  //WHAT IF don't do reremders at all; each cell updates itself with classes?

//no adjacent ships?
  //separate validateBoard in gameboard?

//remove appendCells from gameinfo's placeship because will do first and only
//append cells after ships are placed (maybe?)
  //this should work with creting a gameboard just for placing ships or whatever
  //since appendCells only displays ships now 
