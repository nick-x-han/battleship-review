import { appendCells, renderBoard } from "./display.js";
import { GameController } from "./gameController.js";
import { Player } from "./player.js";
import { BOARD_SIZE, FLEET_SIZE } from "./gameboard.js";

let headerDiv = document.querySelector("#header");
let contentDiv = document.querySelector("#content");
let buttonDiv = document.querySelector("#button-container");
let viewsArray = [];
let game;

// let confirmButton = document.querySelector("#");
//onclick: move to next view in list
//views return a small object for a result?

export function initializeViews() {
  queueView(chooseNameView());
  displayNextView();
}

function queueView(view) {
  viewsArray.push(view);
}

function displayNextView() {
  if (viewsArray.length === 0) return;
  buttonDiv.replaceChildren();
  let currentView = viewsArray.shift();
  headerDiv.append(currentView);
}

function createNewButton(text, onClick) {
  let nextViewButton = document.createElement("button");
  nextViewButton.textContent = text;
  if (onClick) nextViewButton.addEventListener("click", onClick, { once: true });
  nextViewButton.addEventListener("click", () => displayNextView());
  return nextViewButton;
}

function nameSelectView(isDefaultHuman = true) {
  let select = document.createElement("select");
  let cpuOption = document.createElement("option");
  let humanOption = document.createElement("option");
  cpuOption.text = "CPU";
  humanOption.text = "Human";
  cpuOption.value = "CPU";
  humanOption.value = "Human";

  select.add(cpuOption);
  select.add(humanOption);

  select.selectedIndex = isDefaultHuman ? 1 : 0;
  return select;
}

function nameInputView(defaultName = "Player") {
  let playerInput = document.createElement("input");
  playerInput.value = defaultName;

  return playerInput;
}

function appendToHeader(text, ) {
  
}

function resetHeader() {
  headerDiv.replaceChildren();
}

function onConfirmNames(name1, name2, selected1, selected2) {
  headerDiv.replaceChildren();
  let namesDiv = document.createElement("div");
  let player1Name = document.createElement("div");
  let player2Name = document.createElement("div");
  player1Name.textContent = `${name1}'s board`;
  player2Name.textContent = `${name2}'s board`;
  namesDiv.append(player1Name, player2Name);
  namesDiv.classList.add("two-items-horizontal");
  headerDiv.append(namesDiv);

  let isCPU1 = selected1 === "CPU" ? true : false;
  let isCPU2 = selected2 === "CPU" ? true : false;

  const player1 = new Player(name1, isCPU1);
  const player2 = new Player(name2, isCPU2);
  game = new GameController(player1, player2, 500);
  queueView();

  if (!player1.isCPU) queueView(placeShipsView(player1));
  if (!player2.isCPU) queueView(placeShipsView(player2));
  // gameDisplay(name1, name2, isCPU1, isCPU2);
}

function chooseNameView() {
  let player1Div = document.createElement("div");
  let player2Div = document.createElement("div");
  let playersDiv = document.createElement("div");

  let player1Input = nameInputView("Human");
  let player2Input = nameInputView("CPU");
  let player1Select = nameSelectView();
  let player2Select = nameSelectView(false);

  playersDiv.classList.add("two-items-horizontal");

  player1Div.append(player1Input, player1Select);
  player2Div.append(player2Input, player2Select);

  playersDiv.append(player1Div, player2Div);

  let confirmButton = createNewButton("Start Game", () =>
    onConfirmNames(
      player1Input.value,
      player2Input.value,
      player1Select.value,
      player2Select.value,
    ));

  let outputDiv = document.createElement("div");
  outputDiv.append(playersDiv, confirmButton);
  outputDiv.classList.add("two-items-vertical");

  return outputDiv;
}

function placeShipsView(player) {
  // player.board.
  let shipBoard = renderBoard(player);
  // appendCells(player, shipBoard);
  return shipBoard;
}

// function gameDisplay(name1, name2, isCPU1, isCPU2) {
//   const player1 = new Player(name1, isCPU1);
//   const player2 = new Player(name2, isCPU2);
//   // if (!player1.isCPU) placeShipsView(player1);
//   // if (!player2.isCPU) placeShipsView(player2);
//   game = new GameController(player1, player2, 500);
//   game.startGame();
// }

function gameView() {
  let player1 = game.player1;
  let player2 = game.player2;
}
