class Point
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


	getX()
	{
		return this.x;
	}


	getY()
	{
		return this.y;
	}


	getI()
	{
		return this.i;
	}


	getAngle()
	{
		return this.angle;
	}


	setAngle(angle: number)
	{
		this.angle = angle;
		return this;
	}

}
