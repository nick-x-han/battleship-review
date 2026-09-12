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

test("vertical ship of length 4 throws error if placed at (7, 3)", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  expect(() => gameboard.placeShip(ship, [7, 3], true)).toThrow("Cannot place out-of-bounds ship");
})

test("horizontal ship of length 4 throws error if placed at (3, 7)", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  expect(() => gameboard.placeShip(ship, [3, 7], false)).toThrow("Cannot place out-of-bounds ship");
})

test("x coordinate of origin cannot be out of bounds", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  expect(() => gameboard.placeShip(ship, [10, 0], true)).toThrow("Cannot place out-of-bounds ship");
})

test("y coordinate of origin cannot be out of bounds", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  expect(() => gameboard.placeShip(ship, [0, 10], true)).toThrow("Cannot place out-of-bounds ship");
})

test("vertical ship throws error if y coordinate is out of bounds", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  expect(() => gameboard.placeShip(ship, [0, 10], true)).toThrow("Cannot place out-of-bounds ship");
})

test("cannot place a ship with length > 4", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(5);
  expect(() => gameboard.placeShip(ship, [3, 3], true)).toThrow("Cannot place ships with length > 4");
})

test("cannot place the same ship twice", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  gameboard.placeShip(ship, [5, 5], true);
  expect(() => gameboard.placeShip(ship, [0, 0], true)).toThrow("Already placed this ship");
})

test("cannot place more than one 4-length ship", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(4);
  let ship2 = new Ship(4);
  gameboard.placeShip(ship, [3, 3], true);
  expect(() => gameboard.placeShip(ship2, [3, 3], true)).toThrow("Exceeded limit of ships of length 4");
})

test("cannot place more than three 2-length ships", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(2);
  let ship2 = new Ship(2);
  let ship3 = new Ship(2);
  let ship4 = new Ship(2);
  gameboard.placeShip(ship, [0, 0], true);
  gameboard.placeShip(ship2, [0, 1], true);
  gameboard.placeShip(ship3, [0, 2], true);
  expect(() => gameboard.placeShip(ship4, [0, 3], true)).toThrow("Exceeded limit of ships of length 2");
})

test("cannot overlap two ships", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(3);
  let ship2 = new Ship(3);
  gameboard.placeShip(ship, [0, 0], true);
  expect(() => gameboard.placeShip(ship2, [2, 0], true)).toThrow("Cannot overlap onto another ship");
})

//can delete a ship with hits()
  // 1 for successful hit, -1 for not
//two different ships are treated separately



//need to figure out how to deal with the top and bottom edges with current placeShip
//maybe automatically right or down unless at bottom or right, then flip?
  //simply just if anything goes out of bounds just go other direction?
  //or maybe just do math so that it's always default down adn right unless the length would prohibit down/right in which case it goes other direction