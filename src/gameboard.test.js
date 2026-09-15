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

test("when a ship is attacked, the coordinate's value becomes 1", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(1);
  gameboard.placeShip(ship, [3, 3], true);
  expect(gameboard.board[3][3]).toBe(ship);
  gameboard.receiveAttack([3, 3]);
  expect(gameboard.board[3][3]).toBe(1);
})

test("when a 2-length ship is attacked twice in the same spot, it is not sunk", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(2);
  gameboard.placeShip(ship, [3, 3], true);
  gameboard.receiveAttack([3, 3]);
  gameboard.receiveAttack([3, 3]);
  expect(ship.isSunk()).toBe(false);
})

test("when an empty spot is attacked, the coordinate's value becomes -1", () => {
  let gameboard = new Gameboard();
  gameboard.receiveAttack([3, 3]);
  expect(gameboard.board[3][3]).toBe(-1);
})

test("after a successful attack, reattacking will not change the coord value from 1", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(2);
  gameboard.placeShip(ship, [3, 3], true);
  expect(gameboard.receiveAttack([3, 3])).toBe("hit");
  expect(gameboard.receiveAttack([3, 3])).toBe("repeat");
  expect(gameboard.board[3][3]).toBe(1);
})

test("attacking one part of a ship won't affect the others", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.board[0][0]).toBe(1);
  expect(gameboard.board[1][0]).toBe(ship);
})

test("when ships are all sunk, defeated state", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(1);
  let ship2 = new Ship(1);
  gameboard.placeShip(ship, [0, 0]);
  gameboard.placeShip(ship2, [3, 0]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.isDefeated()).toBe(false);
  gameboard.receiveAttack([3, 0]);
  expect(gameboard.isDefeated()).toBe(true);
})

//idea: cell class to track attacked or not

// make receive attack return the square's value prior to attack
  // make the value become the length of the ship?