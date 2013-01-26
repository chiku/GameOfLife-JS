(function () {
    "use strict";

    var world = World(),
        TIME_INTERVAL = 100;

    world.addCell(Cell({x:  0, y:  0}))
         .addCell(Cell({x:  1, y: -1}))
         .addCell(Cell({x:  2, y: -1}))
         .addCell(Cell({x:  3, y: -1}))
         .addCell(Cell({x: -3, y: -1}))
         .addCell(Cell({x: -2, y: -1}))
         .addCell(Cell({x: -2, y:  1}));

    window.onload = function () {
        var options = {
                window: window,
                canvas: document.getElementById('world'),
                height: 1280,
                width: 800,
                cellSize: 4,
                world: world
            },

            game = Game(options);

        game.initialize();
        setInterval(game.render, TIME_INTERVAL);
    };
} ());
