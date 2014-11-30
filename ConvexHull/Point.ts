module ConvexHull
{

	export class Point
	{

		private x: number;
		private y: number;
		private i: number;
		private angle: number = 0;


		constructor(x: number, y: number, i: number = -1)
		{
			this.x = x;
			this.y = y;
			this.i = i;
		}


		getX(): number
		{
			return this.x;
		}


		getY(): number
		{
			return this.y;
		}


		getI(): number
		{
			return this.i;
		}


		getAngle(): number
		{
			return this.angle;
		}


		setAngle(angle: number): Point
		{
			this.angle = angle;
			return this;
		}

	}

}
