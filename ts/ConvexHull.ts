/// <reference path="Point.ts" />
/// <reference path="Helpers.ts" />


class ConvexHull
{

	static quickHull(points: Point[], result)
	{
		var extremes = Helpers.findExtremes(points);
		var min = extremes.min;
		var max = extremes.max;

		result.counter += points.length;

		result.polygon.push(min);
		result.polygon.push(max);

		ConvexHull._quickHull(min, max, points, result);
		ConvexHull._quickHull(max, min, points, result);

		result.polygon = Helpers.sortConvexPolygon(result.polygon);
	}


	static _quickHull(a: Point, b: Point, points: Point[], result)
	{
		if (!points.length) {
			return ;
		}

		var farthest = Helpers.findFarthestPointFromLineToTheLeft(a, b, points);

		result.counter += points.length;
		result.polygon.push(farthest);

		var s1 = [];
		var s2 = [];

		for (var i = 0, len = points.length; i < len; i++) {
			if (points[i] === a || points[i] === b || points[i] === farthest) {
				continue;
			}

			result.counter++;
			if (Helpers.laysPointInTriangle(points[i], a, b, farthest)) {
				continue;
			}

			if (Helpers.isPointToTheLeftFromLine(points[i], a, farthest)) {
				s1.push(points[i]);

			} else if (Helpers.isPointToTheLeftFromLine(points[i], farthest, b)) {
				s2.push(points[i]);
			}
		}

		var halfs = Helpers.splitPointsByTriangle(a, b, farthest, points);
		result.counter += points.length;

		ConvexHull._quickHull(a, farthest, halfs[0], result);
		ConvexHull._quickHull(farthest, b, halfs[1], result);
	}


	static giftWrapping(points: Point[], result)
	{
		var first = Helpers.findExtremes(points)['max'];

		var current = first;
		var line = [ 0, -1 ];

		do {
			result.counter++;
			result.polygon.push(current);

			var angle = null;
			var newLine = null;
			var newCurrent = null;

			for (var i = 0, len = points.length; i < len; i++) {
				if (points[i] === current) {
					continue;
				}

				result.counter++;
				var tmpLine = [ points[i].x - current.x, points[i].y - current.y ];
				var tmpAngle = Helpers.vectorsAngle(line, tmpLine);

				if (angle === null || tmpAngle < angle) {
					angle = tmpAngle;
					newLine = tmpLine;
					newCurrent = points[i];
				}
			}

			line = newLine;
			current = newCurrent;

		} while (current !== first);
	}


	static primitive(points: Point[], result)
	{
		var pointCount = points.length;

		for (var i = 0; i < pointCount; i++) {
			var isCP = true;

			for (var j = 0; isCP && j < pointCount; j++) {
				if (i === j) {
					continue;
				}

				for (var k = 0; isCP && k < pointCount; k++) {
					if (i === k || j === k) {
						continue;
					}

					for (var l = 0; isCP && l < pointCount; l++) {
						if (i === l || j === l || k === l) {
							continue;
						}

						result.counter++;
						if (Helpers.laysPointInTriangle(points[i], points[j], points[k], points[l])) {
							isCP = false;
						}
					}
				}
			}

			if (isCP) {
				result.polygon.push(points[i]);
			}
		}

		result.polygon = Helpers.sortConvexPolygon(result.polygon);
	}

}
