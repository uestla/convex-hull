;(function (window, $) {
	$(function () {

		var padding = 50;
		var canvas = $('#canvas');
		var width = canvas.width();
		var height = canvas.height();

		var points = [];


		// === points =======================================================

		function generatePoints(num)
		{
			points = [];

			while (points.length < num) {
				var duplicate = false;
				var x = padding + Math.floor((width - 2 * padding) * Math.random());
				var y = padding + Math.floor((height - 2 * padding) * Math.random());

				for (var i = 0, len = points.length; i < len; i++) {
					if (points[i].x === x || points[i].y === y) {
						duplicate = true;
						break;
					}
				}

				if (!duplicate) {
					points.push({
						i: i,
						x: x,
						y: y
					});
				}
			}
		}


		function drawPoints()
		{
			canvas.removeLayers();
			canvas.clearCanvas();

			for (var i = 0, len = points.length; i < len; i++) {
				drawPoint('' + i, points[i].x, points[i].y, '#000', '#777', '' + i);
			}
		}


		function drawPoint(name, x, y, borderColor, fillColor, label)
		{
			canvas.drawArc({
				x: x,
				y: y,
				radius: 3,
				layer: true,
				strokeWidth: 1,
				groups: [ 'point' ],
				fillStyle: fillColor,
				name: 'point.' + name,
				strokeStyle: borderColor
			});
		}


		function highlightPoint(p, borderColor, fillColor)
		{
			canvas.removeLayer('point.' + p.i);
			drawPoint('' + p.i, p.x, p.y, borderColor, fillColor, '' + p.i);
		}


		// === algorithms =======================================================

		function chPrimitive(result)
		{
			var pointCount = points.length;

			for (var i = 0; i < pointCount; i++) {
				result.counter++;
				var isCP = true;

				for (var j = 0; isCP && j < pointCount; j++) {
					if (i === j) {
						continue;
					}

					result.counter++;
					for (var k = 0; isCP && k < pointCount; k++) {
						if (i === k || j === k) {
							continue;
						}

						result.counter++;
						for (var l = 0; isCP && l < pointCount; l++) {
							if (i === l || j === l || k === l) {
								continue;
							}

							result.counter++;
							if (laysPointInTriangle(points[i], points[j], points[k], points[l])) {
								isCP = false;
							}
						}
					}
				}

				if (isCP) {
					result.polygon.push(points[i]);
				}
			}

			result.polygon = sortConvexPolygon(result.polygon);
			drawPolygon(result.polygon, '#44f', '#99f');

			return result.counter;
		}


		function chGiftWrapping(result)
		{
			var first = findExtremes()['max'];

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
					var tmpAngle = vectorsAngle(line, tmpLine);

					if (angle === null || tmpAngle < angle) {
						angle = tmpAngle;
						newLine = tmpLine;
						newCurrent = points[i];
					}
				}

				line = newLine;
				current = newCurrent;

			} while (current !== first);

			drawPolygon(result.polygon, '#44f', '#99f');

			return result.counter;
		}


		function chQuickHull(result)
		{
			var extremes = findExtremes();
			var min = extremes.min;
			var max = extremes.max;

			result.counter += points.length; // finding extremes

			result.polygon.push(min);
			result.polygon.push(max);

			var qhLeft = _chQuickHull(min, max, points, result);
			var qhRight = _chQuickHull(max, min, points, result);

			for (var i = 0, len = qhLeft; i < len; i++) {
				result.polygon.push(qhLeft[i]);
			}

			for (var i = 0, len = qhRight; i < len; i++) {
				result.polygon.push(qhRight[i]);
			}

			result.polygon = sortConvexPolygon(result.polygon);
			drawPolygon(result.polygon, '#44f', '#99f');

			return result.counter;
		}


		function _chQuickHull(a, b, _points, result)
		{
			if (!_points.length) {
				return ;
			}

			var farthest = null;
			var distance = null;

			for (var i = 0, len = _points.length; i < len; i++) {
				if (_points[i] === a || _points[i] === b) {
					continue;
				}

				result.counter++;
				if (!isPointToTheLeftFromLine(_points[i], a, b)) {
					continue;
				}

				var newDistance = pointFromLineDistance(_points[i], a, b);

				if (distance === null || newDistance > distance) {
					farthest = _points[i];
					distance = newDistance;
				}
			}

			result.polygon.push(farthest);

			var s1 = [];
			var s2 = [];

			for (var i = 0, len = _points.length; i < len; i++) {
				if (_points[i] === a || _points[i] === b || _points[i] === farthest) {
					continue;
				}

				result.counter++;
				if (laysPointInTriangle(_points[i], a, b, farthest)) {
					continue;
				}

				if (isPointToTheLeftFromLine(_points[i], a, farthest)) {
					s1.push(_points[i]);

				} else if (isPointToTheLeftFromLine(_points[i], farthest, b)) {
					s2.push(_points[i]);
				}
			}

			_chQuickHull(a, farthest, s1, result);
			_chQuickHull(farthest, b, s2, result);
		}


		// === polygons =======================================================

		function drawPolygon(polygon, borderColor, color)
		{
			canvas.removeLayerGroup('polygon');

			for (var i = 0, len = polygon.length; i < len; i++) {
				highlightPoint(polygon[i], borderColor, color);

				canvas.drawLine({
					layer: true,
					strokeWidth: 2,
					strokeStyle: color,
					groups: [ 'polygon' ],
					name: 'polygonLine.' + i,

					x1: polygon[i].x,
					y1: polygon[i].y,
					x2: polygon[(i + 1) % len].x,
					y2: polygon[(i + 1) % len].y
				});
			}
		}


		function sortConvexPolygon(points)
		{
			var c = findCentroid(points);

			for (var i = 0, len = points.length; i < len; i++) {
				points[i].angle = Math.atan2(points[i].y - c.y, points[i].x - c.x);
			}

			points.sort(function (a, b) {
				return a.angle - b.angle;
			});

			return points;
		}


		// === helpers =======================================================

		function findExtremes()
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


		function findCentroid(points)
		{
			var c = {
				x: 0,
				y: 0
			};

			for (var i = 0, len = points.length; i < len; i++) {
				c.x += points[i].x;
				c.y += points[i].y;
			}

			c.x /= len;
			c.y /= len;

			return c;
		}


		function laysPointInTriangle(a, k, l, m)
		{
			return (l.y - k.y) * (k.x - a.x) + (k.x - l.x) * (k.y - a.y) <= 0
					&& (m.y - l.y) * (l.x - a.x) + (l.x - m.x) * (l.y - a.y) <= 0
					&& (k.y - m.y) * (m.x - a.x) + (m.x - k.x) * (m.y - a.y) <= 0;
		}


		function vectorsAngle(u, v)
		{
			return Math.atan2(u[0] * v[1] - v[0] * u[1], u[0] * v[0] + u[1] * v[1]);
		}


		function pointFromLineDistance(x, a, b)
		{
			var Dx = b.x - a.x;
			var Dy = b.y - a.y;
			return Math.abs(Dy * x.x - Dx * x.y + b.x * a.y) / Math.sqrt(Dx * Dx + Dy * Dy);
		}


		function isPointToTheLeftFromLine(x, a, b)
		{
			return ((b.x - a.x) * (x.y - a.y) - (b.y - a.y) * (x.x - a.x)) < 0;
		}


		// === running & results =======================================================

		function operationCountInfo(count, elapsedTime, algName)
		{
			canvas.drawText({
				x: 10,
				y: 428,
				layer: true,
				fontSize: 12,
				align: 'left',
				fillStyle: '#777',
				fromCenter: false,
				name: 'operationCount',
				text: count + ' operations in ' + elapsedTime + 'ms (' + algName + ')'
			});
		}


		function runAlgorithm(callback, name)
		{
			var result = {
				counter: 0,
				polygon: []
			};

			var start = (new Date()).getTime();
			callback(result);
			var elapsed = (new Date()).getTime() - start;

			drawPolygon(result.polygon, '#44f', '#99f');
			operationCountInfo(result.counter, elapsed, name);
		}


		var pointCount = $('#point-count');
		var pointCountInfo = $('#point-count-info');

		function onPointCountChange() {
			pointCountInfo.text(pointCount.val());
		}

		onPointCountChange();

		pointCount.on('input change', function (event) {
			onPointCountChange();
		});


		$('#algs button').on('click', function (event) {
			$('#algs button').attr('disabled', true);
			$('#clear').attr('disabled', null);
		});


		$('#generate').on('click', function (event) {
			generatePoints(parseInt(pointCount.val()));
			drawPoints();

			$('#clear').attr('disabled', true);
			$('#algs button').attr('disabled', null);
		});


		$('#alg-quick-hull').on('click', function (event) {
			runAlgorithm(chQuickHull, 'quick hull');
		});


		$('#alg-gift-wrapping').on('click', function (event) {
			runAlgorithm(chGiftWrapping, 'gift wrapping');
		});


		$('#alg-primitive').on('click', function (event) {
			runAlgorithm(chPrimitive, 'primitive');
		});


		$('#clear').on('click', function (event) {
			canvas.removeLayerGroup('polygon').removeLayer('operationCount');

			canvas.setLayerGroup('point', {
				fillStyle: '#777',
				strokeStyle: '#000'
			});

			canvas.drawLayers();

			$(this).attr('disabled', true);
			$('#algs button').attr('disabled', null);
		});

	});
})(window, window.jQuery);
