import { appendCells, renderBoard } from "./display.js";
import { GameController } from "./gameController.js";
import { CPU, Player } from "./player.js";
import { BOARD_SIZE } from "./gameboard.js";

let headerDiv = document.querySelector("#header");
let contentDiv = document.querySelector("#content");
let viewsQueue = [];
let game;
let cpuDelay = 0;

// let confirmButton = document.querySelector("#");
//onclick: move to next view in list
//views return a small object for a result?

export function initializeViews(delay) {
  cpuDelay = delay;
  queueView(() => chooseNameView());
  displayNextView();
}

function queueView(view, parent = headerDiv) {
  viewsQueue.push({ view: view, parent });
}

function displayNextView() {
  if (viewsQueue.length === 0) return;
  resetAll();
  let viewObject = viewsQueue.shift();
  viewObject.parent.append(viewObject.view());
}

function createViewButton(text, onClick) {
  let nextViewButton = document.createElement("button");
  nextViewButton.textContent = text;
  if (onClick)
    nextViewButton.addEventListener("click", onClick, { once: true });
  nextViewButton.addEventListener("click", () => displayNextView());
  return nextViewButton;
}

function createTextDiv(text) {
  let textDiv = document.createElement("div");
  textDiv.textContent = text;
  return textDiv;
}

function resetAll() {
  headerDiv.replaceChildren();
  contentDiv.replaceChildren();
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
  resetAll();

  let isCPU1 = selected1 === "CPU" ? true : false;
  let isCPU2 = selected2 === "CPU" ? true : false;

  const player1 = isCPU1 ? new CPU(name1) : new Player(name1);
  const player2 = isCPU2 ? new CPU(name2) : new Player(name2);
  game = new GameController(player1, player2, cpuDelay);

  if (!player1.isCPU) queueView(() => placeShipsView(player1), contentDiv);
  if (!player2.isCPU) queueView(() => placeShipsView(player2), contentDiv);

  queueView(() => gameView(), contentDiv);
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

  let confirmButton = createViewButton(
    "Start Game",
    () =>
      onConfirmNames(
        player1Input.value,
        player2Input.value,
        player1Select.value,
        player2Select.value,
      ),
    headerDiv,
  );

  let outputDiv = document.createElement("div");
  outputDiv.append(playersDiv, confirmButton);
  outputDiv.classList.add("two-items-vertical");

  return outputDiv;
}

function placeShipsView(player) {
  player.placeShipsRandom();
  let shipBoard = renderBoard(player);
  shipBoard.classList.add("player");
  let randomizeButton = document.createElement("button");
  randomizeButton.onclick = () => {
    player.resetShips();
    player.placeShipsRandom();
    appendCells(player, shipBoard);
  };
  randomizeButton.textContent = "Randomize Placements";

  let confirmButton = createViewButton("Confirm Placements", () => {});

  let descriptionText = createTextDiv(`${player.name}: Place Ships`);

  headerDiv.append(descriptionText);
  headerDiv.append(randomizeButton);
  headerDiv.append(confirmButton);
  contentDiv.classList.remove("two-items-horizontal");
  contentDiv.classList.add("two-items-vertical");

  return shipBoard;
}

function gameView() {
  let player1 = game.player1;
  let player2 = game.player2;
  let playerName1 = createTextDiv(`${player1.name}'s board`);
  let playerName2 = createTextDiv(`${player2.name}'s board`);
  headerDiv.append(playerName1, playerName2);

  contentDiv.classList.add("two-items-horizontal");
  contentDiv.classList.remove("two-items-vertical");

  let containerDiv = document.createElement("div");

  if (player1.board.getShips() < BOARD_SIZE)
    player1.placeShipsRandom();
  if (player2.board.getShips() < BOARD_SIZE)
    player2.placeShipsRandom();

  appendCells(player1, player1.dom);
  appendCells(player2, player2.dom);

  containerDiv.append(player1.dom, player2.dom);
  containerDiv.classList.add("two-items-horizontal");
  game.startGame(contentDiv);
  return containerDiv;
}
