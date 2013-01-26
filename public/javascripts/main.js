(function () {
    "use strict";

    var world = World(),
        options;

    world.addCell(Cell({x:  0, y:  0}))
         .addCell(Cell({x:  1, y: -1}))
         .addCell(Cell({x:  2, y: -1}))
         .addCell(Cell({x:  3, y: -1}))
         .addCell(Cell({x: -3, y: -1}))
         .addCell(Cell({x: -2, y: -1}))
         .addCell(Cell({x: -2, y:  1}));

    options = {
        world: world,
        selectors: {
            world: 'world'
        }
    };

    Game(window, document, options);
} ());
