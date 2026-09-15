import { GameInfo } from "./gameInfo.js";
import { Player } from "./player.js";

let headerDiv = document.querySelector("#header");

export function chooseNameView() {
  let player1Name = document.createElement("input");
  let player2Name = document.createElement("input");
  let confirmButton = document.createElement("button");
  let namesDiv = document.createElement("div");

  player1Name.value = "Human";
  player2Name.value = "CPU";

  confirmButton.textContent = "Start Game";
  confirmButton.onclick = () => {
    let name1 = player1Name.value;
    let name2 = player2Name.value;
    namesDiv.replaceChildren();
    confirmButton.remove();
    let player1Display = document.createElement("div");
    let player2Display = document.createElement("div");
    player1Display.textContent = name1;
    player2Display.textContent = name2;
    namesDiv.append(player1Display, player2Display);

    gameView(name1, name2);
  }

  namesDiv.id = "names";

  namesDiv.append(player1Name, player2Name);
  headerDiv.append(namesDiv, confirmButton);
}

export function gameView(name1, name2) {
  const player1 = new Player(name1, false);
  const player2 = new Player(name2, true);
  let game = new GameInfo(player1, player2);
  game.startGame();
}
//change appendCells method so that on player turn won't show enemy's ships
