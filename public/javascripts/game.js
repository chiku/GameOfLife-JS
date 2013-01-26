(function (window, document) {
    var Game = function (options) {
        "use strict";

        var MarkCell = Life.MarkCell,
            markCell = options.markCell,
            currentWorld = options.world,
            previousWorld = options.world,

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
            render: render
        };
    };

    window.Life = window.Life || {};
    window.Life.Game = Game;
}(window, document, undefined));
