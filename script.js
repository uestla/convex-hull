;(function (window, $) {
	$(function () {

		var padding = 50;
		var canvas = $('#canvas');
		var width = canvas.width();
		var height = canvas.height();

		var points = [];


		function generatePoints(num)
		{
			points = [];

			for (var i = 0; i < num; i++) {
				points.push({
					i: i,
					x: padding + Math.floor((width - 2 * padding) * Math.random()),
					y: padding + Math.floor((height - 2 * padding) * Math.random())
				});
			}
		}


		function drawPoints()
		{
			canvas.removeLayers();
			canvas.clearCanvas();

			for (var i = 0, len = points.length; i < len; i++) {
				drawPoint('' + i, points[i].x, points[i].y, '#777', '' + i);
			}
		}


		function drawPoint(name, x, y, color, label)
		{
			canvas.drawArc({
					x: x,
					y: y,
					radius: 6,
					layer: true,
					strokeWidth: 3,
					fillStyle: color,
					strokeStyle: '#000',
					name: 'point.' + name,
					groups: [ 'point.' + name ]
				});

				/* canvas.drawText({
					fontSize: 8,
					layer: true,
					x: x,
					y: y,
					text: '' + label,
					fillStyle: '#fff',
					name: 'pointLabel' + name,
					groups: [ 'point.' + name ]
				}); */
		}


		function highlightPoint(p, color)
		{
			canvas.removeLayer('point.' + p.i);
			drawPoint('' + p.i, p.x, p.y, color, '' + p.i);
		}


		function chPrimitive()
		{
			var polygon = [];
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

							if (laysInPolygon(points[i], points[j], points[k], points[l])) {
								isCP = false;
							}
						}
					}
				}

				if (isCP) {
					polygon.push(points[i]);
				}
			}

			polygon = sortConvexPolygon(polygon);
			drawPolygon(polygon, '#0c0');
		}


		function drawPolygon(polygon, color)
		{
			canvas.removeLayerGroup('polygon');

			for (var i = 0, len = polygon.length; i < len; i++) {
				highlightPoint(polygon[i], '#0c0');

				canvas.drawLine({
					layer: true,
					strokeWidth: 3,
					x1: polygon[i].x,
					y1: polygon[i].y,
					strokeStyle: color,
					groups: [ 'polygon' ],
					x2: polygon[(i + 1) % len].x,
					y2: polygon[(i + 1) % len].y,
					name: 'polygonLine.' + i
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


		function drawTriangle(a, b, c)
		{
			canvas.drawLine({
				x1: a.x,
				y1: a.y,
				x2: b.x,
				y2: b.y,
				x3: c.x,
				y3: c.y,
				x4: a.x,
				y4: a.y,
				layer: true,
				strokeStyle: '#f00',
				name: 'triangl' + a.x + '.' + a.y + '.' + b.x + '.' + b.y + '.' + c.x + '.' + c.y
			});
		}


		function laysInPolygon(a, k, l, m)
		{
			return (l.y - k.y) * (k.x - a.x) + (k.x - l.x) * (k.y - a.y) <= 0
					&& (m.y - l.y) * (l.x - a.x) + (l.x - m.x) * (l.y - a.y) <= 0
					&& (k.y - m.y) * (m.x - a.x) + (m.x - k.x) * (m.y - a.y) <= 0;
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
		});


		$('#generate').on('click', function (event) {
			generatePoints(parseInt(pointCount.val()));
			drawPoints();

			$('#algs button').attr('disabled', null);
		});


		$('#alg-primitive').on('click', function (event) {
			chPrimitive();
		});

	});
})(window, window.jQuery);
