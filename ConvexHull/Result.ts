/// <reference path="Point.ts" />


module ConvexHull
{

	export class Result
	{

		private counter: number = 0;
		private polygon: Point[] = [];


		count(num: number = 1): Result
		{
			this.counter += num;
			return this;
		}


		getCounter(): number
		{
			return this.counter;
		}


		addVertex(v: Point): Result
		{
			this.polygon.push(v);
			return this;
		}


		getPolygon(): Point[]
		{
			return this.polygon;
		}


		sortPolygon(): Result
		{
			this.polygon = Helpers.sortConvexPolygon(this.polygon);
			return this;
		}

	}

}
