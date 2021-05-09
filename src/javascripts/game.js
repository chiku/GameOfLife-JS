const Cell = require('./cell');
const Rules = require('./rules');
const World = require('./world');

class Game {
  constructor({ world, markCell }) {
    this.currentWorld = world;
    this.previousWorld = world;
    this.markCell = markCell;
  }

  addCellsToCurrentWorld(cells) {
    cells.forEach((cell) => {
      this.currentWorld.addCell(new Cell(cell.coordinates()));
    });
  }

  carryForwardCellsIntoCurrentWorld() {
    const cellsRemainAlive = this.previousWorld.cells
      .filter((cell) => Rules.carryLiveCellForward(this.previousWorld.neighbourCountFor(cell)));

    this.addCellsToCurrentWorld(cellsRemainAlive);
  }

  carryForwardShadowsIntoCurrentWorld() {
    const cellsComeAlive = this.previousWorld.shadows
      .filter((cell) => Rules.carryDeadCellForward(this.previousWorld.neighbourCountFor(cell)));

    this.addCellsToCurrentWorld(cellsComeAlive);
  }

  tick() {
    this.previousWorld = this.currentWorld;
    this.currentWorld = new World();
    this.carryForwardCellsIntoCurrentWorld();
    this.carryForwardShadowsIntoCurrentWorld();
  }

  render() {
    this.previousWorld.cells.forEach(((cell) => {
      this.markCell.deadAt(cell.coordinates());
    }));
    this.currentWorld.cells.forEach(((cell) => {
      this.markCell.aliveAt(cell.coordinates());
    }));
  }
}

module.exports = Game;
