import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews(500);

//switch sides so active player always on left

//for dragging ships, just create new Ship(1) for each position to check
  //will need refactoring probably cause how will a dom ship be tracked?
    //maybe create a new dom object with the cells that is position: relative
    //and z index lower so that it can be dragged propelry?

//each view has its own header and content so that the single view 
//returned actually amkes sense (+ don't need resetAll anymore)
  //BETTER: header is just "Battleship", content is what is modified
  //by views

// .cell acts as drop-target