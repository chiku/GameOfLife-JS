(function () {
    var Main = function () {
        "use strict";

        var World = Life.World,
            Game = Life.Game,
            MarkCell = Life.MarkCell,
            Cell = Life.Cell,

            load = function () {
                var canvas = document.getElementById('world'),
                    context = canvas.getContext('2d'),
                    TIME_INTERVAL = 100,

                    world = World()
                            .addCell(Cell({x: 0, y: 0}))
                            .addCell(Cell({x: 1, y: -1}))
                            .addCell(Cell({x: 2, y: -1}))
                            .addCell(Cell({x: 3, y: -1}))
                            .addCell(Cell({x: -3, y: -1}))
                            .addCell(Cell({x: -2, y: -1}))
                            .addCell(Cell({x: -2, y: 1})),

                    markCell = new MarkCell({
                        context: context,
                        width: canvas.width,
                        height: canvas.height,
                        cellSize: 4
                    }),

                    game = Game({
                        window: window,
                        markCell: markCell,
                        world: world
                    });

                setInterval(game.render, TIME_INTERVAL);
            };

        return {
            load: load
        };
    };

    window.Life = window.Life || {};
    window.Life.Main = Main;
}());
