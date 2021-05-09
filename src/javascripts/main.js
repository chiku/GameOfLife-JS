const Cell = require('./cell');
const World = require('./world');
const Game = require('./game');
const MarkCell = require('./mark.cell');

const canvas = document.getElementById('world');
const context = canvas.getContext('2d');
const TIME_INTERVAL = 100;

const markCell = new MarkCell({
  context,
  width: canvas.width,
  height: canvas.height,
  cellSize: 4,
});

const world = new World()
  .addCell(new Cell({ x: 0, y: 0 }))
  .addCell(new Cell({ x: 1, y: -1 }))
  .addCell(new Cell({ x: 2, y: -1 }))
  .addCell(new Cell({ x: 3, y: -1 }))
  .addCell(new Cell({ x: -3, y: -1 }))
  .addCell(new Cell({ x: -2, y: -1 }))
  .addCell(new Cell({ x: -2, y: 1 }));

const game = new Game({
  markCell,
  world,
});

function loop() {
  game.render();
  game.tick();
  setTimeout(loop, TIME_INTERVAL);
}

loop();
