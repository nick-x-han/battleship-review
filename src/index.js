import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews(500);

//switch sides so active player always on left

//each view has its own header and content so that the single view 
//returned actually amkes sense (+ don't need resetAll anymore)
  //BETTER: header is just "Battleship", content is what is modified
  //by views



//renderShips after each placement, but need separate function
//fix how pointer leaves board -> only one cell stays inside