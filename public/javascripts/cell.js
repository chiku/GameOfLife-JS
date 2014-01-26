(function (window, undefined) {
    "use strict";

    var Cell = function (options) {
        if (!(this instanceof Cell)) {
            return new Cell(options);
        }

        this.x = options.x;
        this.y = options.y;
    };

    Cell.prototype = (function() {
        var coordinates = function() {
                return {
                    x: this.x,
                    y: this.y
                };
            },

            coordinatesDisplacedTo = function (displacement) {
                return {
                    x: this.x + displacement.x,
                    y: this.y + displacement.y
                };
            },

            isAt = function (coordinates) {
                return this.x === coordinates.x && this.y === coordinates.y;
            },

            dump = function () {
                console.log('(' + this.x + ', ' + this.y + ')');
            };

        return {
            coordinates: coordinates,
            coordinatesDisplacedTo: coordinatesDisplacedTo,
            isAt: isAt,
            dump: dump
        };
    }());

    window.Life = window.Life || {};
    window.Life.Cell = Cell;
}(window));
