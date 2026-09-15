import { appendCells, renderBoard } from "./display.js";
import { GameController } from "./gameController.js";
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

function placeShipsView(player) {
  // player.board.
  let shipBoard = renderBoard(player);
  // appendCells(player, shipBoard);
  contentDiv.append(shipBoard);
  
}

function gameDisplay(name1, name2, isCPU1, isCPU2) {
  const player1 = new Player(name1, isCPU1);
  const player2 = new Player(name2, isCPU2);
  // if (!player1.isCPU) placeShipsView(player1);
  // if (!player2.isCPU) placeShipsView(player2);
  let game = new GameController(player1, player2, 1000);
  game.startGame();
}
