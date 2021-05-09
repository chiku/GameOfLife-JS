const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
// eslint-disable-next-line no-multi-assign
const { describe, it } = exports.lab = Lab.script();

const Cell = require('../../src/javascripts/cell');
const World = require('../../src/javascripts/world');
const Game = require('../../src/javascripts/game');

describe('Game', () => {
  describe('on a tick', () => {
    describe('a cell', () => {
      describe('with 2 neighbours', () => {
        it('carries forward to next generation', () => {
          const world = new World();
          const cellWithTwoNeighbours = new Cell({ x: 10, y: 4 });
          world.addCell(cellWithTwoNeighbours)
            .addCell(new Cell({ x: 10, y: 3 }))
            .addCell(new Cell({ x: 9, y: 4 }));
          const game = new Game({ world });
          game.tick();
          expect(game.currentWorld.hasCellAt({ x: 10, y: 4 })).to.be.true();
        });
      });

      describe('with 3 neighbours', () => {
        it('carries forward to next generation', () => {
          const world = new World();
          const cellWithThreeNeighbours = new Cell({ x: 10, y: 4 });
          world.addCell(cellWithThreeNeighbours)
            .addCell(new Cell({ x: 10, y: 3 }))
            .addCell(new Cell({ x: 9, y: 4 }))
            .addCell(new Cell({ x: 9, y: 3 }));
          const game = new Game({ world });
          game.tick();
          expect(game.currentWorld.hasCellAt({ x: 10, y: 4 })).to.be.true();
        });
      });

      describe('with 1 neighbour', () => {
        it("doesn't carry forward to next generation", () => {
          const world = new World();
          const cellWithOneNeighbours = new Cell({ x: 10, y: 4 });
          world.addCell(cellWithOneNeighbours)
            .addCell(new Cell({ x: 10, y: 3 }));
          const game = new Game({ world });
          game.tick();
          expect(game.currentWorld.hasCellAt({ x: 10, y: 4 })).to.be.false();
        });
      });

      describe('with 4 neighbours', () => {
        it("doesn't carries forward to next generation", () => {
          const world = new World();
          const cellWithThreeNeighbours = new Cell({ x: 10, y: 4 });
          world.addCell(cellWithThreeNeighbours)
            .addCell(new Cell({ x: 10, y: 3 }))
            .addCell(new Cell({ x: 9, y: 4 }))
            .addCell(new Cell({ x: 9, y: 3 }))
            .addCell(new Cell({ x: 11, y: 4 }));
          const game = new Game({ world });
          game.tick();
          expect(game.currentWorld.hasCellAt({ x: 10, y: 4 })).to.be.false();
        });
      });
    });
  });

  describe('a shadow (dead cell)', () => {
    describe('with 3 neighbours', () => {
      it('comes to life in next generation', () => {
        const world = new World();
        world.addCell(new Cell({ x: 1, y: 1 }))
          .addCell(new Cell({ x: 1, y: 0 }))
          .addCell(new Cell({ x: -1, y: -1 }));
        const game = new Game({ world });
        game.tick();
        expect(game.currentWorld.hasCellAt({ x: 0, y: 0 })).to.be.true();
      });
    });

    describe('with 2 neighbours', () => {
      it("doesn't come to life in next generation", () => {
        const world = new World();
        world.addCell(new Cell({ x: 1, y: 1 }))
          .addCell(new Cell({ x: 1, y: 0 }));
        const game = new Game({ world });
        game.tick();
        expect(game.currentWorld.hasCellAt({ x: 0, y: 0 })).to.be.false();
      });
    });

    describe('with 4 neighbours', () => {
      it("doesn't come to life in next generation", () => {
        const world = new World();
        world.addCell(new Cell({ x: 1, y: 1 }))
          .addCell(new Cell({ x: 1, y: 0 }))
          .addCell(new Cell({ x: -1, y: 1 }))
          .addCell(new Cell({ x: -1, y: 0 }));
        const game = new Game({ world });
        game.tick();
        expect(game.currentWorld.hasCellAt({ x: 0, y: 0 })).to.be.false();
      });
    });
  });
});
