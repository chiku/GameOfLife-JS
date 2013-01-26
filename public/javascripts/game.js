var Game = function (window, document, options) {
    "use strict";

    var WIDTH = 1280,
        HEIGHT = 800,
        TIME_INTERVAL = 100,
        window = window,
        document = document,
        currentWorld = options.world,
        previousWorld = options.world,
        selectors = options.selectors,
        markCell,

        initialize = function (options) {
            var canvas = document.getElementById(selectors.world),
                context = canvas.getContext('2d');

            markCell = new MarkCell({
                context: context,
                width: WIDTH,
                height: HEIGHT
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


    window.onload = function () {
        initialize();
        setInterval(render, TIME_INTERVAL);
    };
};
