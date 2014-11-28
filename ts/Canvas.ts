/// <reference path="Point.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="jcanvas.d.ts" />


class Canvas
{

	public width: number;
	public height: number;
	public canvas: JQuery;
	public padding: number;


	constructor(canvas: JQuery, padding)
	{
		this.canvas = canvas;
		this.padding = padding;
		this.width = canvas.width();
		this.height = canvas.height();
	}


	drawPoints(points: Point[])
	{
		this.canvas.removeLayers().clearCanvas();

		for (var i = 0, len = points.length; i < len; i++) {
			this.drawPoint('' + i, points[i], '#000', '#777');
		}
	}


	drawPoint(name: string, p: Point, borderColor: string, fillColor: string)
	{
		this.canvas.drawArc({
			x: p.x,
			y: p.y,
			radius: 3,
			layer: true,
			strokeWidth: 1,
			groups: [ 'point' ],
			fillStyle: fillColor,
			name: 'point.' + name,
			strokeStyle: borderColor
		});
	}


	highlightPoint(p: Point, borderColor: string, fillColor: string)
	{
		this.canvas.removeLayer('point.' + p.i);
		this.drawPoint('' + p.i, p, borderColor, fillColor);
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

				x1: polygon[i].x,
				y1: polygon[i].y,
				x2: polygon[(i + 1) % len].x,
				y2: polygon[(i + 1) % len].y
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
