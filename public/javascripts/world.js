"use strict";

var World = function () {
	var cells = [];
	
	var addCell = function (cell) {
		cells.push(cell);
	};

	var hasCellAt = function (x, y) {
		return cells.some(function (cell) {
			return cell.isAt(x, y);
		});
	};

	return {
		addCell: addCell,
		hasCellAt: hasCellAt
	};
};
