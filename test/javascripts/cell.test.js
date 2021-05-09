const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
// eslint-disable-next-line no-multi-assign
const { describe, it } = exports.lab = Lab.script();

const Cell = require('../../src/javascripts/cell');

describe('Cell', () => {
  it('knows its x-coordinates', () => {
    expect(new Cell({ x: 2, y: 10 }).coordinates().x).to.equal(2);
  });

  it('knows its y-coordinates', () => {
    expect(new Cell({ x: 2, y: 10 }).coordinates().y).to.equal(10);
  });

  it('knows its x-coordinates at a displacement', () => {
    expect(new Cell({ x: 2, y: 10 }).coordinatesDisplacedTo({ x: 5, y: 8 }).x).to.equal(7);
  });

  it('knows its y-coordinates at a displacement', () => {
    expect(new Cell({ x: 2, y: 10 }).coordinatesDisplacedTo({ x: 5, y: 8 }).y).to.equal(18);
  });

  describe('when coordinates match', () => {
    it('is at a location', () => {
      const cell = new Cell({ x: 10, y: 4 });
      expect(cell.isAt({ x: 10, y: 4 })).to.be.true();
    });
  });

  describe("when x-coordinates don't match", () => {
    it('is not at the location', () => {
      const cell = new Cell({ x: 10, y: 4 });
      expect(cell.isAt({ x: -10, y: 4 })).to.be.false();
    });
  });

  describe("when y-coordinates don't match", () => {
    it('is not at the location', () => {
      const cell = new Cell({ x: 10, y: 4 });
      expect(cell.isAt({ x: 10, y: -4 })).to.be.false();
    });
  });
});
