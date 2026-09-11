import { test, expect } from "@jest/globals"
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

test("ship of length 4 placed at (3, 3) vertically goes to (6, 3)", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  gameboard.placeShip(ship, [3, 3], true);
  expect(gameboard.board[3][3]).toBe(ship);
  expect(gameboard.board[6][3]).toBe(ship);
  expect(gameboard.board[7][3]).toBe(0);
})

test("ship of length 4 cannot be placed at (8, 3)", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  gameboard.placeShip(ship, [3, 3], true);
  expect(gameboard.board[3][3]).toBe(ship);
})

//cannot place more than 1 four length
//cannot place more than 2 three lengths
//two different ships are treated separately
//cannot place the same ship twice




//need to figure out how to deal with the top and bottom edges with current placeShip
//maybe automatically right or down unless at bottom or right, then flip?
  //simply just if anything goes out of bounds just go other direction?
  //or maybe just do math so that it's always default down adn right unless the length would prohibit down/right in which case it goes other direction