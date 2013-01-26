describe("World", function() {
  "use strict";

  var Cell = Life.Cell,
      World = Life.World;

  describe("when coordinates match", function() {
    it("knows that it contains a cell", function() {
      var world = World();
      world.addCell(Cell({x: 10, y: 4}))
      expect(world.hasCellAt({x:10, y:4})).toBeTruthy();
    });
  });

  describe("when a new cell is created", function() {
    it("flags all its neighbours as shadows", function() {
      var world = World();
      world.addCell(Cell({x: 0, y: 0}));
      var corners = [{x:-1, y:-1}, {x:-1, y:0}, {x:-1, y:1},
                     {x:0,  y:-1},              {x:0, y:1},
                     {x:1,  y:-1}, {x:1, y:0},  {x:1, y:1}];
      corners.forEach(function(coordinates) {
        expect(world.hasShadowAt(coordinates)).toBeTruthy();
      });
    });

    it("doesn't flag itself as a shadow", function() {
      var world = World();
      world.addCell(Cell({x: 0, y: 0}));
      expect(world.hasShadowAt({x:0, y:0})).toBeFalsy();
    });

    it("removes a shadow when a cell comes into existance", function() {
      var world = World();
      world.addCell(Cell({x: 0, y: 0}))
           .addCell(Cell({x: 0, y: 1}));
      expect(world.hasShadowAt({x:0, y:1})).toBeFalsy();
    });

    it("doesn't remove a shadow when a cell comes into existance at a neighbouring place", function() {
      var world = World();
      world.addCell(Cell({x: 0, y: 0}))
           .addCell(Cell({x: 0, y: 1}));
      var corners = [{x:-1, y:-1}, {x:-1, y:0}, {x:-1, y:1},
                     {x:0,  y:-1},
                     {x:1,  y:-1}, {x:1, y:0},  {x:1, y:1}];
      corners.forEach(function(coordinates) {
        expect(world.hasShadowAt(coordinates)).toBeTruthy();
      });
    });
  });

  describe("when x-coordinates don't match", function() {
   it("knows that it doesn't contain a cell", function() {
      var world = World();
      world.addCell(Cell({x: 10, y: 4}));
      expect(world.hasCellAt({x:-10, y:4})).toBeFalsy();
    });
  });

  describe("when y-coordinates don't match", function() {
    it("knows that it doesn't contain a cell", function() {
      var world = World();
      world.addCell(Cell({x: 10, y: 4}));
      expect(world.hasCellAt({x:10, y:-4})).toBeFalsy();
    });
  });

  describe("neighbour count for alive cells", function() {
    [ ["south-west", -1, -1], ["west", -1, +0],  ["north-west", -1, +1],
      ["south",      +0, -1],                    ["east",       +0, +1],
      ["south-west", +1, -1], ["south", +1, +0], ["south-east", +1, +1]
    ].forEach(function (options) {
      var direction = options[0],
          x = options[1],
          y = options[2];
      describe("when a cell is present at " + direction, function() {
        it("is one", function() {
          var world = World();
          var cell = Cell({x: 4, y: 10});
          var neighbour = Cell({x: 4+x, y: 10+y});
          world.addCell(cell).addCell(neighbour);
          expect(world.neighbourCountFor(cell)).toEqual(1);
        });
      });
    });

    describe("when none are present", function() {
      it("is zero", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10})
        world.addCell(cell);
        expect(world.neighbourCountFor(cell)).toEqual(0);
      });
    });

    describe("when all neighbours are present", function() {
      it("is eight", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10});
        world.addCell(cell)
             .addCell(Cell({x: 3, y: 9}))
             .addCell(Cell({x: 3, y: 10}))
             .addCell(Cell({x: 3, y: 11}))
             .addCell(Cell({x: 4, y: 9}))
             .addCell(Cell({x: 4, y: 11}))
             .addCell(Cell({x: 5, y: 9}))
             .addCell(Cell({x: 5, y: 10}))
             .addCell(Cell({x: 5, y: 11}));
        expect(world.neighbourCountFor(cell)).toEqual(8);
      });
    });
  });

  describe("on a tick", function() {
    describe("carries forward to next genaration a cell", function() {
      it("with 2 neighbours", function() {
        var world = World();
        var cellWithTwoNeighbours = Cell({x: 10, y: 4});
        world.addCell(cellWithTwoNeighbours)
             .addCell(Cell({x: 10, y: 3}))
             .addCell(Cell({x: 9, y: 4}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeTruthy();
      });

      it("with 3 neighbours", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4});
        world.addCell(cellWithThreeNeighbours)
             .addCell(Cell({x: 10, y: 3}))
             .addCell(Cell({x: 9, y: 4}))
             .addCell(Cell({x: 9, y: 3}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeTruthy();
      });
    });

    describe("when number of neighbours is 1", function() {
      it("doesn't carries forward to next genaration a cell", function() {
        var world = World();
        var cellWithOneNeighbours = Cell({x: 10, y: 4});
        world.addCell(cellWithOneNeighbours)
             .addCell(Cell({x: 10, y: 3}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeFalsy();
      });
    });

    describe("when number of neighbours is 4", function() {
      it("doesn't carries forward to next genaration a cell", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4});
        world.addCell(cellWithThreeNeighbours)
             .addCell(Cell({x: 10, y: 3}))
             .addCell(Cell({x: 9, y: 4}))
             .addCell(Cell({x: 9, y: 3}))
             .addCell(Cell({x: 11, y: 4}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeFalsy();
      });
    });

    describe("when number of neighbours is 3", function() {
      it("has dead cell come to life", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}))
             .addCell(Cell({x: -1, y: -1}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeTruthy();
      });
    });

    describe("when number of neighbours is 2", function() {
      it("doesn't have dead cell come to life", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeFalsy();
      });
    });

    describe("when number of neighbours is 4", function() {
      it("doesn't have dead cell come to life", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}))
             .addCell(Cell({x: -1, y: 1}))
             .addCell(Cell({x: -1, y: 0}));
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeFalsy();
      });
    });
  });
});
