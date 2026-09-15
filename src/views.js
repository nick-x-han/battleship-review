import { appendCells, renderBoard } from "./display.js";
import { GameInfo } from "./gameInfo.js";
import { Player } from "./player.js";
import { BOARD_SIZE, FLEET_SIZE } from "./gameboard.js";

let headerDiv = document.querySelector("#header");
let contentDiv = document.querySelector("#content");

export function initializeViews() {
  headerDiv.append(chooseNameView());
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

  gameDisplay(name1, name2, isCPU1, isCPU2);
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

  let confirmButton = document.createElement("button");
  confirmButton.textContent = "Start Game";
  confirmButton.onclick = () =>
    onConfirmNames(
      player1Input.value,
      player2Input.value,
      player1Select.value,
      player2Select.value,
    );

  let outputDiv = document.createElement("div");
  outputDiv.append(playersDiv, confirmButton);
  outputDiv.classList.add("two-items-vertical");

  return outputDiv;
}

function shipView(length) {
  let xInput = document.createElement("input");
  let xLabel = document.createElement("label");
  xLabel.htmlFor = "x";
  xLabel.value = "X:";
  xInput.id = "x";
  xInput.type = "number";
  xInput.min = 0;
  xInput.max = BOARD_SIZE - 1;
  let yInput = document.createElement("input");
  let yLabel = document.createElement("label");
  yLabel.htmlFor = "y";
  yLabel.value = "Y:";
  yInput.id = "y";
  yInput.type = "number";
  yInput.min = 0;
  yInput.max = BOARD_SIZE - 1;
  
  let inputsDiv = document.createElement("div");

  let visualDiv = document.createElement("div");
  for (let i = 0; i < length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    visualDiv.appendChild(cell);
  }
  visualDiv.classList.add("board");
  inputsDiv.append(xInput, xLabel, yInput, yLabel);
  inputsDiv.classList.add("two-items-horizontal");
  let outputDiv = document.createElement("div");
  outputDiv.append(visualDiv, inputsDiv);
  outputDiv.classList.add("two-items-vertical");
  outputDiv.classList.add("place-ship");
  return outputDiv;
}

function shipLengthView(length) {
  let count = FLEET_SIZE[length];
  let lengthDiv = document.createElement("div");
  for (let i = 0; i < count; i++) {
    lengthDiv.append(shipView(length));
  }
  return lengthDiv;
}

function placeShipsView(player) {
  let shipBoard = renderBoard(player);
  shipBoard.draggable = true;
  appendCells(player, shipBoard);
  contentDiv.append(shipBoard);
  for (let i = 0; i < 4; i++) {
    shipBoard.append(shipLengthView(i + 1));
  }
}

function gameDisplay(name1, name2, isCPU1, isCPU2) {
  const player1 = new Player(name1, isCPU1);
  const player2 = new Player(name2, isCPU2);
  if (!player1.isCPU) placeShipsView(player1);
  if (!player2.isCPU) placeShipsView(player2);
  // let game = new GameInfo(player1, player2, 1000);
  // game.startGame();
}
