describe("Game", function() {
  "use strict";

  var Cell = Life.Cell,
      World = Life.World,
      Game = Life.Game;

  describe("on a tick", function() {
    describe("a cell", function () {
      describe("with 2 neighbours", function () {
        it("carries forward to next generation", function() {
          var world = World();
          var cellWithTwoNeighbours = Cell({x: 10, y: 4});
          world.addCell(cellWithTwoNeighbours)
               .addCell(Cell({x: 10, y: 3}))
               .addCell(Cell({x: 9, y: 4}));
          var game = new Game({world: world});
          game.tick();
          expect(game.currentWorld().hasCellAt({x:10, y:4})).toBeTruthy();
        });
      });

      describe("with 3 neighbours", function () {
        it("carries forward to next generation", function() {
          var world = World();
          var cellWithThreeNeighbours = Cell({x: 10, y: 4});
          world.addCell(cellWithThreeNeighbours)
               .addCell(Cell({x: 10, y: 3}))
               .addCell(Cell({x: 9, y: 4}))
               .addCell(Cell({x: 9, y: 3}));
          var game = new Game({world: world});
          game.tick();
          expect(game.currentWorld().hasCellAt({x:10, y:4})).toBeTruthy();
        });
      });

      describe("with 1 neighbour", function() {
        it("doesn't carry forward to next generation", function() {
          var world = World();
          var cellWithOneNeighbours = Cell({x: 10, y: 4});
          world.addCell(cellWithOneNeighbours)
               .addCell(Cell({x: 10, y: 3}));
          var game = new Game({world: world});
          game.tick();
          expect(game.currentWorld().hasCellAt({x:10, y:4})).toBeFalsy();
        });
      });

      describe("with 4 neighbours", function() {
        it("doesn't carries forward to next generation", function() {
          var world = World();
          var cellWithThreeNeighbours = Cell({x: 10, y: 4});
          world.addCell(cellWithThreeNeighbours)
               .addCell(Cell({x: 10, y: 3}))
               .addCell(Cell({x: 9, y: 4}))
               .addCell(Cell({x: 9, y: 3}))
               .addCell(Cell({x: 11, y: 4}));
          var game = new Game({world: world});
          game.tick();
          expect(game.currentWorld().hasCellAt({x:10, y:4})).toBeFalsy();
        });
      });
    });
  });

  describe("a shadow (dead cell)", function () {
    describe("with 3 neighbours", function () {
      it("comes to life in next generation", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}))
             .addCell(Cell({x: -1, y: -1}));
        var game = new Game({world: world});
        game.tick();
        expect(game.currentWorld().hasCellAt({x:0, y:0})).toBeTruthy();
      });
    });

    describe("with 2 neighbours", function () {
      it("doesn't come to life in next generation", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}));
        var game = new Game({world: world});
        game.tick();
        expect(game.currentWorld().hasCellAt({x:0, y:0})).toBeFalsy();
      });
    });

    describe("with 4 neighbours", function () {
      it("doesn't come to life in next generation", function() {
        var world = World();
        world.addCell(Cell({x: 1, y: 1}))
             .addCell(Cell({x: 1, y: 0}))
             .addCell(Cell({x: -1, y: 1}))
             .addCell(Cell({x: -1, y: 0}));
        var game = new Game({world: world});
        game.tick();
        expect(game.currentWorld().hasCellAt({x:0, y:0})).toBeFalsy();
      });
    });
  });
});
