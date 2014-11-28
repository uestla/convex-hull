class Helpers
{

	static sortConvexPolygon(points: Point[])
	{
		var c = this.findCentroid(points);

		for (var i = 0, len = points.length; i < len; i++) {
			points[i].angle = Math.atan2(points[i].y - c.y, points[i].x - c.x);
		}

		points.sort(function (a, b) {
			return a.angle - b.angle;
		});

		return points;
	}


	static findCentroid(points: Point[])
	{
		var c = new Point(0, 0);

		for (var i = 0, len = points.length; i < len; i++) {
			c.x += points[i].x;
			c.y += points[i].y;
		}

		c.x /= len;
		c.y /= len;

		return c;
	}


	static laysPointInTriangle(a: Point, k: Point, l: Point, m: Point)
	{
		return (l.y - k.y) * (k.x - a.x) + (k.x - l.x) * (k.y - a.y) <= 0
				&& (m.y - l.y) * (l.x - a.x) + (l.x - m.x) * (l.y - a.y) <= 0
				&& (k.y - m.y) * (m.x - a.x) + (m.x - k.x) * (m.y - a.y) <= 0;
	}


	static findExtremes(points: Point[])
	{
		var minX = null;
		var maxX = null;

		for (var i = 0, len = points.length; i < len; i++) {
			if (minX === null || points[i].x < minX.x) {
				minX = points[i];
			}

			if (maxX === null || points[i].x > maxX.x) {
				maxX = points[i];
			}
		}

		return {
			min: minX,
			max: maxX
		};
	}


	static vectorsAngle(u: number[], v: number[])
	{
		return Math.atan2(u[0] * v[1] - v[0] * u[1], u[0] * v[0] + u[1] * v[1]);
	}


	static findFarthestPointFromLineToTheLeft(a: Point, b: Point, points: Point[])
	{
		var farthest = null;
		var distance = null;

		for (var i = 0, len = points.length; i < len; i++) {
			if (points[i] === a || points[i] === b) {
				continue;
			}

			if (!Helpers.isPointToTheLeftFromLine(points[i], a, b)) {
				continue;
			}

			var newDistance = Helpers.pointFromLineDistance(points[i], a, b);

			if (distance === null || newDistance > distance) {
				farthest = points[i];
				distance = newDistance;
			}
		}

		return farthest;
	}


	static splitPointsByTriangle(a: Point, b: Point, c: Point, points: Point[])
	{
		var halfs = [[], []];

		for (var i = 0, len = points.length; i < len; i++) {
			if (points[i] === a || points[i] === b || points[i] === c) {
				continue;
			}

			if (Helpers.laysPointInTriangle(points[i], a, b, c)) {
				continue;
			}

			if (Helpers.isPointToTheLeftFromLine(points[i], a, c)) {
				halfs[0].push(points[i]);

			} else if (Helpers.isPointToTheLeftFromLine(points[i], c, b)) {
				halfs[1].push(points[i]);
			}
		}

		return halfs;
	}


	static isPointToTheLeftFromLine(x: Point, a: Point, b: Point)
	{
		return ((b.x - a.x) * (x.y - a.y) - (b.y - a.y) * (x.x - a.x)) < 0;
	}


	static pointFromLineDistance(x: Point, a: Point, b: Point)
	{
		var Dx = b.x - a.x;
		var Dy = b.y - a.y;
		return Math.abs(Dy * x.x - Dx * x.y + b.x * a.y) / Math.sqrt(Dx * Dx + Dy * Dy);
	}

}
