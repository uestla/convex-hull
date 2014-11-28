/// <reference path="Point.ts" />
/// <reference path="Result.ts" />
/// <reference path="Helpers.ts" />


class ConvexHull
{

	static quickHull(points: Point[], result: Result)
	{
		var extremes = Helpers.findExtremes(points);
		var min = extremes.min;
		var max = extremes.max;

		result.count(points.length);

		result.addVertex(min);
		result.addVertex(max);

		ConvexHull._quickHull(min, max, points, result);
		ConvexHull._quickHull(max, min, points, result);

		result.sortPolygon();
	}


	private static _quickHull(a: Point, b: Point, points: Point[], result: Result)
	{
		if (!points.length) {
			return ;
		}

		var farthest = Helpers.findFarthestPointFromLineToTheLeft(a, b, points);

		result.addVertex(farthest);
		result.count(points.length);

		var halfs = Helpers.splitPointsByTriangle(a, b, farthest, points);
		result.count(points.length);

		ConvexHull._quickHull(a, farthest, halfs[0], result);
		ConvexHull._quickHull(farthest, b, halfs[1], result);
	}


	static giftWrapping(points: Point[], result: Result)
	{
		var first = Helpers.findExtremes(points)['max'];

		var current = first;
		var line = [ 0, -1 ];

		do {
			result.count();
			result.addVertex(current);

			var angle = null;
			var newLine = null;
			var newCurrent = null;

			for (var i = 0, len = points.length; i < len; i++) {
				if (points[i] === current) {
					continue;
				}

				result.count();
				var tmpLine = [ points[i].getX() - current.getX(), points[i].getY() - current.getY() ];
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


	static primitive(points: Point[], result: Result)
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

						result.count();
						if (Helpers.laysPointInTriangle(points[i], points[j], points[k], points[l])) {
							isCP = false;
						}
					}
				}
			}

			if (isCP) {
				result.addVertex(points[i]);
			}
		}

		result.sortPolygon();
	}

}
