const ALIVE_COLOUR = '#cc3366';
const DEAD_COLOUR = '#acc8ac';

class MarkCell {
  constructor({
    height, width, context, cellSize,
  }) {
    this.height = height;
    this.width = width;
    this.context = context;
    this.cellSize = cellSize;
  }

  drawAtWithColour({ colour, x, y }) {
    const x1 = x * this.cellSize + this.width / 2 + this.cellSize / 2;
    const y1 = y * this.cellSize + this.height / 2 + this.cellSize / 2;

    this.context.fillStyle = colour;
    this.context.fillRect(x1, y1, this.cellSize - 1, this.cellSize - 1);
  }

  aliveAt({ x, y }) {
    this.drawAtWithColour({ colour: ALIVE_COLOUR, x, y });
  }

  deadAt({ x, y }) {
    this.drawAtWithColour({ colour: DEAD_COLOUR, x, y });
  }
}

module.exports = MarkCell;
