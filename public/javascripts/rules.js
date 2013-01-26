(function () {
    var Rules = function () {
        "use strict";

        var neighboursNeededForLiveCellToBeAlive = [2, 3],

            neighboursNeededForDeadCellToBeAlive = [3],

            carryLiveCellForward = function (neighbourCount) {
                return neighboursNeededForLiveCellToBeAlive.some(function (count) {
                    return neighbourCount === count;
                });
            },

            carryDeadCellForward = function (neighbourCount) {
                return neighboursNeededForDeadCellToBeAlive.some(function (count) {
                    return neighbourCount === count;
                });
            };

        return {
            carryLiveCellForward: carryLiveCellForward,
            carryDeadCellForward: carryDeadCellForward
        };
    };

    window.Life = window.Life || {};
    window.Life.Rules = Rules;
} ());
