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
                return !hasCellAt(coordinates) && !hasShadowAt(coordinates);
            }).map(function (coordinates) {
                return Cell(coordinates);
            }).forEach(function (cell) {
                shadows.push(cell);
            });
            shadows = shadows.filter(function (shadow) {
                return !shadow.isAt(cell.coordinates());
            });
        },

        hasEntityAtFor = function (entities) {
            return function (coordinates) {
                return entities().some(function (entity) {
                    return entity.isAt(coordinates);
                });
            };
        },

        hasCellAt = hasEntityAtFor(allCells),

        hasShadowAt = hasEntityAtFor(allShadows),

        neighbourCountAt = function (coordinates) {
            return corners.filter(function (corner) {
                return hasCellAt({x:(coordinates.x + corner.x), y:(coordinates.y + corner.y)});
            }).length;
        },

        carryForwardFor = function (options) {
            var entities = options.entities,
                rule = options.rule;

            return function (newWorld) {
                entities().filter(function (entity) {
                    return rule(neighbourCountAt(entity.coordinates()));
                }).forEach(function (entity) {
                    Cell(entity.coordinates()).belongsTo(newWorld);
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
                    entity.dump();
                });
            };
        },

        dumpForCells = dumpFor(allCells),

        dumpForShadows = dumpFor(allShadows),

        dump = function() {
            console.log("********");

            console.log('Cells');
            dumpForCells();

            console.log('Shadows');
            dumpForShadows();

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
