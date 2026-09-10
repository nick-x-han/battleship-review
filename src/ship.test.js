import { test, expect } from "@jest/globals"
import { Ship } from "./ship"

test("returns correct length", () => {
  const ship = new Ship(5);
  expect(ship.getLength()).toBe(5);
})

test("sinks after receiving hits = length", () => {
  const ship = new Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
})