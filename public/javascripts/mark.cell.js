var MarkCell = function (options) {
    "use strict";

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
