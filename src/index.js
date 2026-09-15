import { initializeViews } from "./views.js";

// let headerDiv = document.querySelector("#header");

initializeViews(500);

//switch sides so active player always on left

//no adjacent ships?
  //separate validateBoard in gameboard?

//remove appendCells from gameinfo's placeship because will do first and only
//append cells after ships are placed (maybe?)
  //this should work with creting a gameboard just for placing ships or whatever
  //since appendCells only displays ships now 


//for dragging ships, just create new Ship(1) for each position to check
  //will need refactoring probably cause how will a dom ship be tracked?
    //maybe create a new dom object with the cells that is position: relative
    //and z index lower so that it can be dragged propelry?

//each view has its own header and content so that the single view 
//returned actually amkes sense (+ don't need resetAll anymore)

//make the gameDisplay a view itself

//RIGHT NOW, gamecontroller startGame uses contentDiv. easily
//fixable with passing in a parent or just making it a view