describe("World", function() {
  "use strict";

  describe("knows that it contains a cell", function() {
    it("when coordinates match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt({x:10, y:4})).toBeTruthy();
    });
  });

  describe("when a new cell is created", function() {
    it("flags all its neighbours as shadows", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      var corners = [{x:-1, y:-1}, {x:-1, y:0}, {x:-1, y:1},
                     {x:0,  y:-1},              {x:0, y:1},
                     {x:1,  y:-1}, {x:1, y:0},  {x:1, y:1}];
      corners.forEach(function(coordinates) {
        expect(world.hasShadowAt(coordinates)).toBeTruthy();
      });
    });

    it("doesn't flag itself as a shadow", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      expect(world.hasShadowAt({x:0, y:0})).toBeFalsy();
    });

    it("removes a shadow when a cell comes into existance", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      Cell({x: 0, y: 1}).belongsTo(world);
      expect(world.hasShadowAt({x:0, y:1})).toBeFalsy();
    });

    it("doesn't remove a shadow when a cell comes into existance at a neighbouring place", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      Cell({x: 0, y: 1}).belongsTo(world);
      var corners = [{x:-1, y:-1}, {x:-1, y:0}, {x:-1, y:1},
                     {x:0,  y:-1},
                     {x:1,  y:-1}, {x:1, y:0},  {x:1, y:1}];
      corners.forEach(function(coordinates) {
        expect(world.hasShadowAt(coordinates)).toBeTruthy();
      });
    });
  });

  describe("knows that it doesn't contain a cell", function() {
    it("when x-coordinate don't match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt({x:-10, y:4})).toBeFalsy();
    });

    it("when y-coordinate don't match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt({x:10, y:-4})).toBeFalsy();
    });
  });

  describe("knows neighbour count for alive cells", function() {
    describe("when a cell is present at", function() {
      [ ["south-west", -1, -1], ["west", -1, +0],  ["north-west", -1, +1],
        ["south",      +0, -1],                    ["east",       +0, +1],
        ["south-west", +1, -1], ["south", +1, +0], ["south-east", +1, +1]
      ].forEach(function (options) {
        var direction = options[0],
            x = options[1],
            y = options[2];

        it(direction, function() {
          var world = World();
          var cell = Cell({x: 4, y: 10}).belongsTo(world);
          var northNeighbour = Cell({x: 4+x, y: 10+y}).belongsTo(world);
          expect(world.neighbourCountAt({x:4, y:10})).toEqual(1);
        });
      });
    });

    describe("when none are present", function() {
      it("is zero", function() {
        var world = World();
        var cell = Cell({x: 4, y: 10}).belongsTo(world);
        expect(world.neighbourCountAt({x:4, y:10})).toEqual(0);
      });
    });

    describe("when all neighbours are present", function() {
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
        expect(world.neighbourCountAt({x:4, y:10})).toEqual(8);
      });
    });
  });

  describe("on a tick", function() {
    describe("carries forward to next genaration a cell", function() {
      it("with 2 neighbours", function() {
        var world = World();
        var cellWithTwoNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        Cell({x: 9, y: 4}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeTruthy();
      });

      it("with 3 neighbours", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        Cell({x: 9, y: 4}).belongsTo(world);
        Cell({x: 9, y: 3}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeTruthy();
      });
    });

    describe("doesn't carries forward to next genaration a cell", function() {
      it("with 1 neighbour", function() {
        var world = World();
        var cellWithOneNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeFalsy();
      });

      it("with 4 neighbours", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        Cell({x: 9, y: 4}).belongsTo(world);
        Cell({x: 9, y: 3}).belongsTo(world);
        Cell({x: 11, y: 4}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:10, y:4})).toBeFalsy();
      });
    });

    describe("has dead cell come to life", function() {
      it("when number of neighbours is 3", function() {
        var world = World();
        Cell({x: 1, y: 1}).belongsTo(world);
        Cell({x: 1, y: 0}).belongsTo(world);
        Cell({x: -1, y: -1}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeTruthy();
      });
    })

    describe("doesn't have dead cell come to life", function() {
      it("when number of neighbours is 2", function() {
        var world = World();
        Cell({x: 1, y: 1}).belongsTo(world);
        Cell({x: 1, y: 0}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeFalsy();
      });
    })

    describe("doesn't have dead cell come to life", function() {
      it("when number of neighbours is 4", function() {
        var world = World();
        Cell({x: 1, y: 1}).belongsTo(world);
        Cell({x: 1, y: 0}).belongsTo(world);
        Cell({x: -1, y: 1}).belongsTo(world);
        Cell({x: -1, y: 0}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt({x:0, y:0})).toBeFalsy();
      });
    })
  });
});
