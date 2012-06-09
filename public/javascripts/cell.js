var Cell = function (options) {
    "use strict";

    var x = options.x,
        y = options.y,
        world,

        belongsTo = function (newWorld) {
            world = newWorld;
            world.addCell(this);
            return this;
        },

        getX = function () {
            return x;
        },

        getY = function () {
            return y;
        },

        isAt = function (coordinates) {
            return x === coordinates.x && y === coordinates.y;
        };

    return {
        x: getX,
        y: getY,
        belongsTo: belongsTo,
        isAt: isAt
    };
};
