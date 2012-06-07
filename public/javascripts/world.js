var World = function () {
	"use strict";

	var cells = [],
		shadows = [],
		corners = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
		rules = Rules();

	var allCells = function() {
		return cells;
	};

	var allShadows = function() {
		return shadows;
	};

	var addCell = function (cell) {
		cells.push(cell);
		corners.forEach(function (corner) {
			var x = cell.x() + corner[0],
				y = cell.y() + corner[1];
			if (!hasShadowAt(x, y) && !hasCellAt(x, y)) {
				shadows.push(Cell({x: x, y: y}));
			}
		});
		shadows = shadows.filter(function (shadow) {
			return !shadow.isAt(cell.x(), cell.y());
		});
	};

	var hasEntityAtFor = function (entities) {
		return function (x, y) {
			return entities().some(function (entity) {
				return entity.isAt(x, y);
			});
		};
	};

	var hasCellAt = hasEntityAtFor(allCells);

	var hasShadowAt = hasEntityAtFor(allShadows);

	var neighbourCountAt = function (x, y) {
		return corners.reduce(function (sum, corner) {
			return sum + (hasCellAt(x + corner[0], y + corner[1]) ? 1 : 0);
		}, 0);
	};

	var carryForwardFor = function (options) {
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
	}

	var carryForwardCellsInto = carryForwardFor({
		entities: allCells,
		rule: rules.carryLiveCellForward
	});

	var carryForwardShadowsInto = carryForwardFor({
		entities: allShadows,
		rule: rules.carryDeadCellForward
	});

	var tick = function () {
		var newWorld = World();
		carryForwardCellsInto(newWorld);
		carryForwardShadowsInto(newWorld);
		return newWorld;
	};

	var dumpFor = function(entities) {
		return function() {
			entities().forEach(function (entity) {
				console.log('(' + entity.x() + ', ' + entity.y() + ')');
			});
		};
	};

	var dump = function() {
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
