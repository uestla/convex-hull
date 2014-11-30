/// <reference path="Point.ts" />


module ConvexHull
{

	export class Helpers
	{

		static sortConvexPolygon(points: Point[]): Point[]
		{
			var c = Helpers.findCentroid(points);

			for (var i = 0, len = points.length; i < len; i++) {
				points[i].setAngle(Math.atan2(points[i].getY() - c.getY(), points[i].getX() - c.getX()));
			}

			points.sort(function (a, b) {
				return a.getAngle() - b.getAngle();
			});

			return points;
		}


		static findCentroid(points: Point[]): Point
		{
			var x = 0;
			var y = 0;

			for (var i = 0, len = points.length; i < len; i++) {
				x += points[i].getX();
				y += points[i].getY();
			}

			x /= len;
			y /= len;

			return new Point(x, y);
		}


		static laysPointInTriangle(a: Point, k: Point, l: Point, m: Point): boolean
		{
			return (l.getY() - k.getY()) * (k.getX() - a.getX()) + (k.getX() - l.getX()) * (k.getY() - a.getY()) <= 0
					&& (m.getY() - l.getY()) * (l.getX() - a.getX()) + (l.getX() - m.getX()) * (l.getY() - a.getY()) <= 0
					&& (k.getY() - m.getY()) * (m.getX() - a.getX()) + (m.getX() - k.getX()) * (m.getY() - a.getY()) <= 0;
		}


		static findExtremes(points: Point[]): any
		{
			var minX = null;
			var maxX = null;

			for (var i = 0, len = points.length; i < len; i++) {
				if (minX === null || points[i].getX() < minX.getX()) {
					minX = points[i];
				}

				if (maxX === null || points[i].getX() > maxX.getX()) {
					maxX = points[i];
				}
			}

			return {
				min: minX,
				max: maxX
			};
		}


		static vectorsAngle(u: number[], v: number[]): number
		{
			return Math.atan2(u[0] * v[1] - v[0] * u[1], u[0] * v[0] + u[1] * v[1]);
		}


		static findFarthestPointFromLineToTheLeft(a: Point, b: Point, points: Point[]): Point
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


		static splitPointsByTriangle(a: Point, b: Point, c: Point, points: Point[]): Point[][]
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


		static isPointToTheLeftFromLine(x: Point, a: Point, b: Point): boolean
		{
			return ((b.getX() - a.getX()) * (x.getY() - a.getY()) - (b.getY() - a.getY()) * (x.getX() - a.getX())) < 0;
		}


		static pointFromLineDistance(x: Point, a: Point, b: Point): number
		{
			var Dx = b.getX() - a.getX();
			var Dy = b.getY() - a.getY();
			return Math.abs(Dy * x.getX() - Dx * x.getY() + b.getX() * a.getY()) / Math.sqrt(Dx * Dx + Dy * Dy);
		}

	}

}
