(function () {
    var Game = function (options) {
        "use strict";

        var MarkCell = Life.MarkCell,
            window = options.window,
            width = options.width,
            height = options.height,
            cellSize = options.cellSize,
            currentWorld = options.world,
            previousWorld = options.world,
            context = options.context,
            markCell,

            initialize = function (options) {
                markCell = new MarkCell({
                    context: context,
                    width: width,
                    height: height,
                    cellSize: cellSize
                });
            },

            tick = function () {
                previousWorld = currentWorld;
                currentWorld = currentWorld.tick();
            },

            render = function () {
                previousWorld.cells().forEach(function (cell) {
                    markCell.deadAt(cell.coordinates);
                });
                currentWorld.cells().forEach(function (cell) {
                    markCell.aliveAt(cell.coordinates);
                });
                tick();
            };

        return {
            initialize: initialize,
            render: render
        };
    };

    window.Life = window.Life || {};
    window.Life.Game = Game;
} ());
