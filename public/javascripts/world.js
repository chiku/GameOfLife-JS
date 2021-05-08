const Cell = require('./cell');

const corners = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 },
  { x: 0, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];

function hasEntityAtFor(entities, coordinates) {
  return entities.some((entity) => entity.isAt(coordinates));
}

function dumpFor(entities) {
  entities.forEach((entity) => {
    entity.dump();
  });
}

class World {
  constructor() {
    this.cells = [];
    this.shadows = [];
  }

  addCell(cell) {
    this.cells.push(cell);
    this.castShadowsAround(cell);
    this.removeOldShadowAt(cell);
    return this;
  }

  castShadowsAround(cell) {
    corners.map((corner) => cell
      .coordinatesDisplacedTo(corner))
      .filter((coordinates) => !this.hasCellAt(coordinates) && !this.hasShadowAt(coordinates))
      .map((coordinates) => new Cell(coordinates)).forEach((c) => {
        this.shadows.push(c);
      });
  }

  removeOldShadowAt(cell) {
    this.shadows = this.shadows.filter((shadow) => !shadow.isAt(cell.coordinates()));
  }

  hasCellAt({ x, y }) {
    return hasEntityAtFor(this.cells, { x, y });
  }

  hasShadowAt({ x, y }) {
    return hasEntityAtFor(this.shadows, { x, y });
  }

  neighbourCountFor(entity) {
    return corners.filter((corner) => this.hasCellAt(entity.coordinatesDisplacedTo(corner))).length;
  }

  /* eslint-disable no-console */
  dump() {
    console.log('********');
    console.log('Cells');
    dumpFor(this.cells);

    console.log('Shadows');
    dumpFor(this.shadows);
    console.log('********');

    return this;
  }
}

module.exports = World;
