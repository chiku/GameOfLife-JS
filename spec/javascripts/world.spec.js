describe("World", function() {
  "use strict";

  describe("knows that it contains a cell", function() {
    it("when coordinates match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(10, 4)).toBeTruthy();
    });
  });

  describe("when a new cell is created", function() {
    it("flags all its neighbours as shadows", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      var corners = [[-1, -1], [-1, 0], [-1, 1],
                     [0, -1],           [0, 1],
                     [1, -1],  [1, 0],  [1, 1]];
      corners.forEach(function(corner) {
        expect(world.hasShadowAt(corner[0], corner[1])).toBeTruthy();
      });
    });

    it("doesn't flag itself as a shadow", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      expect(world.hasShadowAt(0, 0)).toBeFalsy();
    });

    it("removes a shadow when a cell comes into existance", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      Cell({x: 0, y: 1}).belongsTo(world);
      expect(world.hasShadowAt(0, 1)).toBeFalsy();
    });

    it("doesn't remove a shadow when a cell comes into existance at a neighbouring place", function() {
      var world = World();
      Cell({x: 0, y: 0}).belongsTo(world);
      Cell({x: 0, y: 1}).belongsTo(world);
      var corners = [[-1, -1], [-1, 0], [-1, 1],
                     [0, -1],
                     [1, -1],  [1, 0],  [1, 1]];
      corners.forEach(function(corner) {
        expect(world.hasShadowAt(corner[0], corner[1])).toBeTruthy();
      });
    });
  });

  describe("knows that it doesn't contain a cell", function() {
    it("when x-coordinate don't match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(-10, 4)).toBeFalsy();
    });

    it("when y-coordinate don't match", function() {
      var world = World();
      Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(10, -4)).toBeFalsy();
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
        expect(newWorld.hasCellAt(10, 4)).toBeTruthy();
      });

      it("with 3 neighbours", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        Cell({x: 9, y: 4}).belongsTo(world);
        Cell({x: 9, y: 3}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt(10, 4)).toBeTruthy();
      });
    });

    describe("doesn't carries forward to next genaration a cell", function() {
      it("with 1 neighbour", function() {
        var world = World();
        var cellWithOneNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt(10, 4)).toBeFalsy();
      });

      it("with 4 neighbours", function() {
        var world = World();
        var cellWithThreeNeighbours = Cell({x: 10, y: 4}).belongsTo(world);
        Cell({x: 10, y: 3}).belongsTo(world);
        Cell({x: 9, y: 4}).belongsTo(world);
        Cell({x: 9, y: 3}).belongsTo(world);
        Cell({x: 11, y: 4}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt(10, 4)).toBeFalsy();
      });
    });

    describe("has dead cell come to life", function() {
      it("when number of neighbours is 3", function() {
        var world = World();
        Cell({x: 1, y: 1}).belongsTo(world);
        Cell({x: 1, y: 0}).belongsTo(world);
        Cell({x: -1, y: -1}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt(0, 0)).toBeTruthy();
      });
    })

    describe("doesn't have dead cell come to life", function() {
      it("when number of neighbours is 2", function() {
        var world = World();
        Cell({x: 1, y: 1}).belongsTo(world);
        Cell({x: 1, y: 0}).belongsTo(world);
        var newWorld = world.tick();
        expect(newWorld.hasCellAt(0, 0)).toBeFalsy();
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
        expect(newWorld.hasCellAt(0, 0)).toBeFalsy();
      });
    })
  });
});

