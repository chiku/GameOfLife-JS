var World = function World() {
	"use strict";

	var cells = [],
		shadows = [];

	var addCell = function (cell) {
		cells.push(cell);
		World.corners.forEach(function (corner) {
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

	var hasCellAt = function (x, y) {
		return cells.some(function (cell) {
			return cell.isAt(x, y);
		});
	};

	var hasShadowAt = function (x, y) {
		return shadows.some(function (shadow) {
			return shadow.isAt(x, y);
		});
	};

	var neighbourCountAt = function (x, y) {
		return World.corners.reduce(function (sum, pair) {
			return sum + (hasCellAt(x + pair[0], y + pair[1]) ? 1 : 0);
		}, 0);
	};

	var tick = function () {
		var newWorld = World();
		cells.forEach(function (cell) {
			var neighbourCount = cell.neighbourCount();
			if (neighbourCount === 2 || neighbourCount === 3) {
				Cell({x: cell.x(), y: cell.y()}).belongsTo(newWorld);
			}
		});
		shadows.forEach(function (shadow) {
			var neighbourCount = World.corners.reduce(function (sum, pair) {
				return sum + (hasCellAt(shadow.x() + pair[0], shadow.y() + pair[1]) ? 1 : 0);
			}, 0);
			if (neighbourCount === 3) {
				Cell({x: shadow.x(), y: shadow.y()}).belongsTo(newWorld);
			}
		});
		return newWorld;
	};

	var dump = function() {
		console.log('Cells');
		cells.forEach(function (cell) {
			console.log('(' + cell.x() + ', ' + cell.y() + ')')
		});

		console.log('Shadows');
		shadows.forEach(function (cell) {
			console.log('(' + cell.x() + ', ' + cell.y() + ')')
		});

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

World.corners = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
