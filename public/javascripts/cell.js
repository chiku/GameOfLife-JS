"use strict";

var Cell = function (options) {
  var x = options.x,
      y = options.y,
      world,
      corners = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];

  var belongsTo = function (newWorld) {
    world = newWorld;
    world.addCell(this);
    return this;
  };

  var isAt = function (testX, testY) {
    return x === testX && y === testY;
  };

  var neighbourCount = function () {
    return corners.reduce(function (sum, pair) {
      return sum + (world.hasCellAt(x + pair[0], y + pair[1]) ? 1 : 0);
    }, 0);
  }

  return {
    belongsTo: belongsTo,
    isAt: isAt,
    neighbourCount: neighbourCount
  }
};
