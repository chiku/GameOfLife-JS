(function () {
    var MarkCell = function (options) {
        var height = options.height,
            width = options.width,
            context = options.context,

            SIZE = 4,
            ALIVE_COLOUR = "#cc3366",
            DEAD_COLOUR = "#acc8ac",

            drawAtWithColour = function (colour) {
                return function (coordinates) {
                    var x = coordinates.x,
                        y = coordinates.y,
                        x1 = x * SIZE + width / 2 + SIZE / 2,
                        y1 = y * SIZE + height / 2 + SIZE / 2;

                    context.fillStyle = colour;
                    context.fillRect(x1, y1, SIZE - 1, SIZE - 1);
                };
            };

        return {
            aliveAt: drawAtWithColour(ALIVE_COLOUR),
            deadAt: drawAtWithColour(DEAD_COLOUR)
        };
    };

    var Game = function (window, document, options) {
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
                var canvas = document.getElementById(selectors.world)
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
            window.setInterval(render, TIME_INTERVAL);
        };
    };

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
