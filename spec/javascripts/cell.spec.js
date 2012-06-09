describe("Cell", function() {
  "use strict";

  it("knows its x-coordinates", function() {
    expect(Cell({x: 2, y: 10}).coordinates().x).toEqual(2);
  });

  it("knows its y-coordinates", function() {
    expect(Cell({x: 2, y: 10}).coordinates().y).toEqual(10);
  });

  it("knows its x-coordinates at a displacement", function() {
    expect(Cell({x: 2, y: 10}).coordinatesDisplacedTo({x: 5, y: 8}).x).toEqual(7);
  });

  it("knows its y-coordinates at a displacement", function() {
    expect(Cell({x: 2, y: 10}).coordinatesDisplacedTo({x: 5, y: 8}).y).toEqual(18);
  });

  describe("is at a location", function() {
    it("when coordinates match", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt({x:10, y:4})).toBeTruthy();
    });
  });

  describe("is not at the location", function() {
    it("when x-coordinates don't match", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt({x:-10, y:4})).toBeFalsy();
    });

    it("when y-coordinates don't match", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt({x:10, y:-4})).toBeFalsy();
    });
  });
});
