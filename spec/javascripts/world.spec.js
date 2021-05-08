const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
const { describe, it } = exports.lab = Lab.script();

const Cell = require('../../public/javascripts/cell');
const World = require('../../public/javascripts/world');

describe('World', () => {
  describe('when coordinates match', () => {
    it('knows that it contains a cell', () => {
      const world = new World();
      world.addCell(new Cell({ x: 10, y: 4 }));
      expect(world.hasCellAt({ x: 10, y: 4 })).to.be.true();
    });
  });

  describe('when a new cell is created', () => {
    it('flags all its neighbours as shadows', () => {
      const world = new World();
      world.addCell(new Cell({ x: 0, y: 0 }));
      const corners = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
        { x: 0, y: -1 }, { x: 0, y: 1 },
        { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];
      corners.forEach((coordinates) => {
        expect(world.hasShadowAt(coordinates)).to.be.true();
      });
    });

    it("doesn't flag itself as a shadow", () => {
      const world = new World();
      world.addCell(new Cell({ x: 0, y: 0 }));
      expect(world.hasShadowAt({ x: 0, y: 0 })).to.be.false();
    });

    it('removes a shadow when a cell comes into existance', () => {
      const world = new World();
      world.addCell(new Cell({ x: 0, y: 0 }))
        .addCell(new Cell({ x: 0, y: 1 }));
      expect(world.hasShadowAt({ x: 0, y: 1 })).to.be.false();
    });

    it("doesn't remove a shadow when a cell comes into existance at a neighbouring place", () => {
      const world = new World();
      world.addCell(new Cell({ x: 0, y: 0 }))
        .addCell(new Cell({ x: 0, y: 1 }));
      const corners = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];
      corners.forEach((coordinates) => {
        expect(world.hasShadowAt(coordinates)).to.be.true();
      });
    });
  });

  describe("when x-coordinates don't match", () => {
    it("knows that it doesn't contain a cell", () => {
      const world = new World();
      world.addCell(new Cell({ x: 10, y: 4 }));
      expect(world.hasCellAt({ x: -10, y: 4 })).to.be.false();
    });
  });

  describe("when y-coordinates don't match", () => {
    it("knows that it doesn't contain a cell", () => {
      const world = new World();
      world.addCell(new Cell({ x: 10, y: 4 }));
      expect(world.hasCellAt({ x: 10, y: -4 })).to.be.false();
    });
  });

  describe('neighbour count for alive cells', () => {
    [['south-west', -1, -1], ['west', -1, +0], ['north-west', -1, +1],
      ['south', +0, -1], ['east', +0, +1],
      ['south-west', +1, -1], ['south', +1, +0], ['south-east', +1, +1],
    ].forEach((options) => {
      const direction = options[0];
      const x = options[1];
      const y = options[2];
      describe(`when a cell is present at ${direction}`, () => {
        it('is one', () => {
          const world = new World();
          const cell = new Cell({ x: 4, y: 10 });
          const neighbour = new Cell({ x: 4 + x, y: 10 + y });
          world.addCell(cell).addCell(neighbour);
          expect(world.neighbourCountFor(cell)).to.equal(1);
        });
      });
    });

    describe('when none are present', () => {
      it('is zero', () => {
        const world = new World();
        const cell = new Cell({ x: 4, y: 10 });
        world.addCell(cell);
        expect(world.neighbourCountFor(cell)).to.equal(0);
      });
    });

    describe('when all neighbours are present', () => {
      it('is eight', () => {
        const world = new World();
        const cell = new Cell({ x: 4, y: 10 });
        world.addCell(cell)
          .addCell(new Cell({ x: 3, y: 9 }))
          .addCell(new Cell({ x: 3, y: 10 }))
          .addCell(new Cell({ x: 3, y: 11 }))
          .addCell(new Cell({ x: 4, y: 9 }))
          .addCell(new Cell({ x: 4, y: 11 }))
          .addCell(new Cell({ x: 5, y: 9 }))
          .addCell(new Cell({ x: 5, y: 10 }))
          .addCell(new Cell({ x: 5, y: 11 }));
        expect(world.neighbourCountFor(cell)).to.equal(8);
      });
    });
  });
});
