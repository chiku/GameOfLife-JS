describe("World", function() {
  "use strict";

  describe("knows that it contains a cell", function() {
    it("when coordinates match", function() {
      var world = World();
      var cellOne = Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(10, 4)).toBeTruthy();
    });
  });

  describe("knows that it donesn't contain a cell", function() {
    it("when x-coordinate don't match", function() {
      var world = World();
      var cellOne = Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(-10, 4)).toBeFalsy();
    });

    it("when y-coordinate don't match", function() {
      var world = World();
      var cellOne = Cell({x: 10, y: 4}).belongsTo(world);
      expect(world.hasCellAt(10, -4)).toBeFalsy();
    });
  });
});
