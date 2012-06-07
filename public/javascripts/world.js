var World = function () {
	"use strict";

	var cells = [],
		shadows = [],
		corners = function() {
			return [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
		};

	var allCells = function() {
		return cells;
	};

	var allShadows = function() {
		return shadows;
	};

	var addCell = function (cell) {
		cells.push(cell);
		corners().forEach(function (corner) {
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
		return corners().reduce(function (sum, corner) {
			return sum + (hasCellAt(x + corner[0], y + corner[1]) ? 1 : 0);
		}, 0);
	};

	var tick = function () {
		var newWorld = World();

		cells.forEach(function (entity) {
			var neighbourCount = neighbourCountAt(entity.x(), entity.y());
			if (Rules.neighboursNeededForLiveCellToBeAlive.some(function (count) {
				return neighbourCount === count;
			})) {
				Cell({x: entity.x(), y: entity.y()}).belongsTo(newWorld);
			}
		});

		shadows.forEach(function (entity) {
			var neighbourCount = neighbourCountAt(entity.x(), entity.y());
			if (Rules.neighboursNeededForDeadCellToBeAlive.some(function (count) {
				return neighbourCount === count;
			})) {
				Cell({x: entity.x(), y: entity.y()}).belongsTo(newWorld);
			}
		});

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
		console.log('Cells');
		dumpFor(allCells);

		console.log('Shadows');
		dumpFor(allShadows);

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

