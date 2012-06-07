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
    return world.neighbourCountAt(x, y);
  };

  return {
    x: getX,
    y: getY,
    belongsTo: belongsTo,
    isAt: isAt,
    neighbourCount: neighbourCount
  }
};
