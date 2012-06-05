describe("Cell", function() {
  "use strict";

  it("knows its x-coordinates", function() {
    expect(Cell({x: 2, y: 10}).x()).toEqual(2);
  });

  it("knows its y-coordinates", function() {
    expect(Cell({x: 2, y: 10}).y()).toEqual(10);
  });

  describe("is at a location", function() {
    it("when coordinates match", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt(10, 4)).toBeTruthy();
    })
  });

  describe("is not at the location", function() {
    it("when x-coordinates don't match'", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt(-10, 4)).toBeFalsy();
    })

    it("when y-coordinates don't match'", function() {
      var cell = Cell({x: 10, y: 4});
      expect(cell.isAt(10, -4)).toBeFalsy();
    })
  });

  describe("knows its neighbour count ", function() {
    describe("when a cell is present at", function() {
      it("north", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 4, y: 11}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("east", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 5, y: 10}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("south", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 3, y: 10}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("west", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 3, y: 10}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("north-east", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 4, y: 11}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("north-west", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 3, y: 11}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("south-east", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 5, y: 9}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });

      it("south-west", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        var northNeighbour = Cell({x: 3, y: 9}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(1);
      });
    });

    describe("when none are present", function() {
      it("is zero", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(0);
      });
    });

    describe("when all are present", function() {
      it("is eight", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        Cell({x: 3, y: 9}).belongsTo(world);
        Cell({x: 3, y: 10}).belongsTo(world);
        Cell({x: 3, y: 11}).belongsTo(world);
        Cell({x: 4, y: 9}).belongsTo(world);
        Cell({x: 4, y: 11}).belongsTo(world);
        Cell({x: 5, y: 9}).belongsTo(world);
        Cell({x: 5, y: 10}).belongsTo(world);
        Cell({x: 5, y: 11}).belongsTo(world);
        expect(cell.neighbourCount()).toEqual(8);
      });
    });
  })
});
