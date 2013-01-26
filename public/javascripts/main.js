var Main = function () {
    "use strict";

    var load = function () {
        var world = World()
                .addCell(Cell({x:  0, y:  0}))
                .addCell(Cell({x:  1, y: -1}))
                .addCell(Cell({x:  2, y: -1}))
                .addCell(Cell({x:  3, y: -1}))
                .addCell(Cell({x: -3, y: -1}))
                .addCell(Cell({x: -2, y: -1}))
                .addCell(Cell({x: -2, y:  1})),
            TIME_INTERVAL = 100,
            canvas = document.getElementById('world'),

            options = {
                window: window,
                context: canvas.getContext('2d'),
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
