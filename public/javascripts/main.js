(function(window, document) {
    var Main = function() {
        "use strict";

        var World = window.Life.World,
            Game = window.Life.Game,
            MarkCell = window.Life.MarkCell,
            Cell = window.Life.Cell,

            canvas = document.getElementById('world'),
            context = canvas.getContext('2d'),
            TIME_INTERVAL = 100,
            timer,

            world = World()
                .addCell(new Cell({x: 0, y: 0}))
                .addCell(new Cell({x: 1, y: -1}))
                .addCell(new Cell({x: 2, y: -1}))
                .addCell(new Cell({x: 3, y: -1}))
                .addCell(new Cell({x: -3, y: -1}))
                .addCell(new Cell({x: -2, y: -1}))
                .addCell(new Cell({x: -2, y: 1})),

            markCell = new MarkCell({
                context: context,
                width: canvas.width,
                height: canvas.height,
                cellSize: 4
            }),

            game = new Game({
                markCell: markCell,
                world: world
            }),

            load = function() {
                var loop = function() {
                    game.render();
                    timer = setTimeout(loop, TIME_INTERVAL);
                },

                    timer = setTimeout(loop, TIME_INTERVAL);
            };

        return {
            load: load
        };
    };

    window.Life = window.Life || {};
    window.Life.Main = Main;
}(window, document, undefined));
