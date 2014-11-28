/// <reference path="Point.ts" />


class Result
{

	private counter: number = 0;
	private polygon: Point[] = [];


	count(num: number = 1)
	{
		this.counter += num;
	}


	getCounter()
	{
		return this.counter;
	}


	addVertex(v: Point)
	{
		this.polygon.push(v);
		return this;
	}


	getPolygon()
	{
		return this.polygon;
	}


	sortPolygon()
	{
		this.polygon = Helpers.sortConvexPolygon(this.polygon);
		return this;
	}

}
