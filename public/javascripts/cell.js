var Cell = function (options) {
  "use strict";

  var x = options.x,
      y = options.y,
      world;

  var belongsTo = function (newWorld) {
    world = newWorld;
    world.addCell(this);
    return this;
  };

  var getX = function () {
    return x;
  };

  var getY = function () {
    return y;
  };

  var isAt = function (testX, testY) {
    return x === testX && y === testY;
  };

  var neighbourCount = function () {
    return Cell.corners.reduce(function (sum, pair) {
      return sum + (world.hasCellAt(x + pair[0], y + pair[1]) ? 1 : 0);
    }, 0);
  };

  return {
    x: getX,
    y: getY,
    belongsTo: belongsTo,
    isAt: isAt,
    neighbourCount: neighbourCount
  }
};

Cell.corners = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
