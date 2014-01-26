(function (window, undefined) {
    "use strict";

    var Cell = function (options) {
        var x = options.x,
            y = options.y,

            coordinates = {
                x: x,
                y: y
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
            isAt: isAt,
            dump: dump
        };
    };

    window.Life = window.Life || {};
    window.Life.Cell = Cell;
}(window));
