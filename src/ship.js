class Ship {
  #length;
  #hits;
  #sunk;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
    this.#sunk = false;
  }

  hit() {
    this.#hits++;
    if (this.#hits === this.#length)
      this.#sunk = true;
  }

  isSunk() {
    return this.#sunk;
  }

  getLength() {
    return this.#length;
  }
}

export { Ship };
