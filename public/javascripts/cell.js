var Cell = function (options) {
    "use strict";

    var x = options.x,
        y = options.y,
        world,

        coordinates = {
            x: x,
            y: y
        },

        belongsTo = function (newWorld) {
            world = newWorld;
            world.addCell(this);
            return this;
        },

        coordinatesDisplacedTo = function (displacement) {
            return {
                x: x + displacement.x,
                y: y + displacement.y
            };
        },

        isAt = function (coordinates) {
            return x === coordinates.x && y === coordinates.y;
        },

        dump = function () {
            console.log('(' + x + ', ' + y + ')');
        };

    return {
        coordinates: coordinates,
        coordinatesDisplacedTo: coordinatesDisplacedTo,
        belongsTo: belongsTo,
        isAt: isAt,
        dump: dump
    };
};
