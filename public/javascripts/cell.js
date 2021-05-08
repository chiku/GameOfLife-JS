class Cell {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  coordinates() {
    return { x: this.x, y: this.y };
  }

  coordinatesDisplacedTo({ x, y }) {
    return {
      x: this.x + x,
      y: this.y + y,
    };
  }

  isAt(coordinates) {
    return this.x === coordinates.x && this.y === coordinates.y;
  }

  /* eslint-disable no-console */
  dump() {
    console.log(`(${this.x}, ${this.y})`);
  }
}

module.exports = Cell;
