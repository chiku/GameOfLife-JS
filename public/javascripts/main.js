(function () {
    var Main = function () {
        "use strict";

        var World = Life.World,
            Game = Life.Game,
            MarkCell = Life.MarkCell,
            Cell = Life.Cell,

            load = function () {
                var world = World()
                            .addCell(Cell({x: 0, y: 0}))
                            .addCell(Cell({x: 1, y: -1}))
                            .addCell(Cell({x: 2, y: -1}))
                            .addCell(Cell({x: 3, y: -1}))
                            .addCell(Cell({x: -3, y: -1}))
                            .addCell(Cell({x: -2, y: -1}))
                            .addCell(Cell({x: -2, y: 1})),

                    TIME_INTERVAL = 100,
                    canvas = document.getElementById('world'),
                    context = canvas.getContext('2d'),

                    markCell = new MarkCell({
                        context: context,
                        width: 800,
                        height: 1280,
                        cellSize: 4
                    }),

                    options = {
                        window: window,
                        context: context,
                        height: 1280,
                        width: 800,
                        cellSize: 4,
                        world: world
                    },

                    game = Game(options);

                game.initialize();
                setInterval(game.render, TIME_INTERVAL);
            };

        return {
            load: load
        };
    };

    window.Life = window.Life || {};
    window.Life.Main = Main;
}());