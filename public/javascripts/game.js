(function (window, undefined) {
    "use strict";

    var Game = function (options) {
        var Cell = window.Life.Cell,
            Rules = window.Life.Rules,
            World = window.Life.World,
            markCell = options.markCell,
            currentWorld = options.world,
            previousWorld = options.world,
            rules = new Rules(),

            addCellsToCurrentWorld = function (cells) {
                cells.forEach(function (cell) {
                    currentWorld.addCell(new Cell(cell.coordinates));
                });
            },

            carryForwardCellsIntoCurrentWorld = function () {
                var cellsRemainAlive = previousWorld.cells().filter(function (cell) {
                    return rules.carryLiveCellForward(previousWorld.neighbourCountFor(cell));
                });

                addCellsToCurrentWorld(cellsRemainAlive);
            },

            carryForwardShadowsIntoCurrentWorld = function () {
                var cellsComeAlive = previousWorld.shadows().filter(function (cell) {
                    return rules.carryDeadCellForward(previousWorld.neighbourCountFor(cell));
                });

                addCellsToCurrentWorld(cellsComeAlive);
            },

            tick = function () {
                previousWorld = currentWorld;
                currentWorld = new World();
                carryForwardCellsIntoCurrentWorld();
                carryForwardShadowsIntoCurrentWorld();
            },

            render = function () {
                previousWorld.cells().forEach(function (cell) {
                    markCell.deadAt(cell.coordinates);
                });
                currentWorld.cells().forEach(function (cell) {
                    markCell.aliveAt(cell.coordinates);
                });
            };

        return {
            render: render,
            tick: tick,
            currentWorld: function () { return currentWorld; }
        };
    };

    window.Life = window.Life || {};
    window.Life.Game = Game;
}(window));
