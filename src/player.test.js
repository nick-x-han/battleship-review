import { test, expect } from "@jest/globals"
import { Player } from "./player"
import { Ship } from "./ship";

test("a player can guess another", () => {
  let cpu = new Player(false);
  let human = new Player(true);
  let ship = new Ship(3);
  human.board.placeShip(ship, [2, 2], true);
  cpu.attack(human, [2, 2]);
  expect(human.board.board[2][2]).toBe(1);
})