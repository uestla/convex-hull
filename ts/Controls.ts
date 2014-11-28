/// <reference path="jquery.d.ts" />


class Controls
{

	public pointCountSlider: JQuery;
	public pointCountInfo: JQuery;

	public generatorButton: JQuery;
	public quickHullButton: JQuery;
	public giftWrappingButton: JQuery;
	public primitiveButton: JQuery;
	public clearButton: JQuery;


	getPointCount(): number
	{
		return parseInt(this.pointCountSlider.val());
	}

}
