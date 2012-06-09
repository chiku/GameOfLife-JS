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

        coordinates = function() {
            return {
                x: x,
                y: y
            };
        },

        isAt = function (coordinates) {
            return x === coordinates.x && y === coordinates.y;
        },

        dump = function () {
            console.log('(' + x + ', ' + y + ')');
        };

    return {
        x: getX,
        y: getY,
        coordinates: coordinates,
        belongsTo: belongsTo,
        isAt: isAt,
        dump: dump
    };
};
