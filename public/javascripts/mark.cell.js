(function (window) {
    var MarkCell = function (options) {
        "use strict";

        var height = options.height,
            width = options.width,
            context = options.context,
            size = options.cellSize,

            ALIVE_COLOUR = "#cc3366",
            DEAD_COLOUR = "#acc8ac",

            drawAtWithColour = function (colour) {
                return function (coordinates) {
                    var x = coordinates.x,
                        y = coordinates.y,
                        x1 = x * size + width / 2 + size / 2,
                        y1 = y * size + height / 2 + size / 2;

                    context.fillStyle = colour;
                    context.fillRect(x1, y1, size - 1, size - 1);
                };
            };

        return {
            aliveAt: drawAtWithColour(ALIVE_COLOUR),
            deadAt: drawAtWithColour(DEAD_COLOUR)
        };
    };

    window.Life = window.Life || {};
    window.Life.MarkCell = MarkCell;
}(window, undefined));
