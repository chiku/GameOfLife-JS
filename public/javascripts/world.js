var World = function () {
    "use strict";

    var cells = [],
        shadows = [],
        corners = [{x:-1,y:-1}, {x:-1,y:0}, {x:-1,y:1}, {x:0,y:-1},
                   {x:0,y:1}, {x:1,y:-1}, {x:1,y:0}, {x:1,y:1}],
        rules = Rules(),

        allCells = function() {
            return cells;
        },

        allShadows = function() {
            return shadows;
        },

        addCell = function (cell) {
            cells.push(cell);
            corners.map(function (corner) {
                return {x: (cell.x() + corner.x), y: (cell.y() + corner.y)};
            }).filter(function (coordinates) {
                var x = coordinates.x, y = coordinates.y;
                return !hasShadowAt(x, y) && !hasCellAt(coordinates);
            }).forEach(function (coordinates) {
                shadows.push(Cell(coordinates));
            });
            shadows = shadows.filter(function (shadow) {
                return !shadow.isAt(cell.x(), cell.y());
            });
        },

        hasEntityAtFor = function (entities) {
            return function (coordinates) {
                return entities().some(function (entity) {
                    return entity.isAt(coordinates.x, coordinates.y);
                });
            };
        },

        hasCellAt = hasEntityAtFor(allCells),

        hasShadowAt = hasEntityAtFor(allShadows),

        neighbourCountAt = function (x, y) {
            return corners.filter(function (corner) {
                return hasCellAt({x:(x+corner.x), y:(y+corner.y)});
            }).length;
        },

        carryForwardFor = function (options) {
            var entities = options.entities,
                rule = options.rule;

            return function (newWorld) {
                entities().forEach(function (entity) {
                    var x = entity.x(),
                        y = entity.y(),
                        neighbourCount = neighbourCountAt(x, y);

                    if (rule(neighbourCount)) {
                        Cell({x: x, y: y}).belongsTo(newWorld);
                    }
                });
            };
        },

        carryForwardCellsInto = carryForwardFor({
            entities: allCells,
            rule: rules.carryLiveCellForward
        }),

        carryForwardShadowsInto = carryForwardFor({
            entities: allShadows,
            rule: rules.carryDeadCellForward
        }),

        tick = function () {
            var newWorld = World();
            carryForwardCellsInto(newWorld);
            carryForwardShadowsInto(newWorld);
            return newWorld;
        },

        dumpFor = function(entities) {
            return function() {
                entities().forEach(function (entity) {
                    console.log('(' + entity.x() + ', ' + entity.y() + ')');
                });
            };
        },

        dump = function() {
            console.log("********");

            console.log('Cells');
            dumpFor(allCells)();

            console.log('Shadows');
            dumpFor(allShadows)();

            console.log("********");
            return this;
        };

    return {
        addCell: addCell,
        hasCellAt: hasCellAt,
        hasShadowAt: hasShadowAt,
        neighbourCountAt: neighbourCountAt,
        tick: tick,
        dump: dump
    };
};
