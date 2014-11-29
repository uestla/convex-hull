/// <reference path="Point.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="jcanvas.d.ts" />


module ConvexHull
{

	export class Canvas
	{

		private width: number;
		private height: number;
		private canvas: JQuery;
		private padding: number;


		constructor(canvas: JQuery, padding: number)
		{
			this.canvas = canvas;
			this.padding = padding;
			this.width = canvas.width();
			this.height = canvas.height();
		}


		getWidth()
		{
			return this.width;
		}


		getHeight()
		{
			return this.height;
		}


		getPadding()
		{
			return this.padding;
		}


		drawPoints(points: Point[])
		{
			this.canvas.removeLayers()
					.clearCanvas();

			for (var i = 0, len = points.length; i < len; i++) {
				this.drawPoint('' + i, points[i], '#000', '#777');
			}
		}


		drawPoint(name: string, p: Point, borderColor: string, fillColor: string)
		{
			this.canvas.drawArc({
				radius: 3,
				layer: true,
				x: p.getX(),
				y: p.getY(),
				strokeWidth: 1,
				groups: [ 'point' ],
				fillStyle: fillColor,
				name: 'point.' + name,
				strokeStyle: borderColor
			});
		}


		highlightPoint(p: Point, borderColor: string, fillColor: string)
		{
			this.canvas.setLayer('point.' + p.getI(), {
				fillStyle: fillColor,
				strokeStyle: borderColor

			}).drawLayers();;
		}


		drawPolygon(polygon: Point[], borderColor: string, color: string)
		{
			this.canvas.removeLayerGroup('polygon');

			for (var i = 0, len = polygon.length; i < len; i++) {
				this.highlightPoint(polygon[i], borderColor, color);

				this.canvas.drawLine({
					layer: true,
					strokeWidth: 2,
					strokeStyle: color,
					groups: [ 'polygon' ],
					name: 'polygonLine.' + i,

					x1: polygon[i].getX(),
					y1: polygon[i].getY(),
					x2: polygon[(i + 1) % len].getX(),
					y2: polygon[(i + 1) % len].getY()
				});
			}
		}


		operationCountInfo(count: number, elapsedTime: number, algName: string)
		{
			this.canvas.drawText({
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


		clearSolution()
		{
			this.canvas.removeLayerGroup('polygon')
				.removeLayer('operationCount')
				.setLayerGroup('point', {
					fillStyle: '#777',
					strokeStyle: '#000'
				})
				.drawLayers();
		}

	}

}
