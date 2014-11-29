/// <reference path="jquery.d.ts" />


module ConvexHull
{

	export class Controls
	{

		private pointCountSlider: JQuery;
		private pointCountInfo: JQuery;

		private generatorButton: JQuery;
		private quickHullButton: JQuery;
		private giftWrappingButton: JQuery;
		private primitiveButton: JQuery;
		private clearButton: JQuery;


		constructor(
			pointCountSlider: JQuery,
			pointCountInfo: JQuery,
			generatorButton: JQuery,
			quickHullButton: JQuery,
			giftWrappingButton: JQuery,
			primitiveButton: JQuery,
			clearButton: JQuery

		) {
			this.pointCountSlider = pointCountSlider;
			this.pointCountInfo = pointCountInfo;

			this.generatorButton = generatorButton;
			this.quickHullButton = quickHullButton;
			this.giftWrappingButton = giftWrappingButton;
			this.primitiveButton = primitiveButton;
			this.clearButton = clearButton;
		}


		getPointCountSlider()
		{
			return this.pointCountSlider;
		}


		getPointCountInfo()
		{
			return this.pointCountInfo;
		}


		getPointCount(): number
		{
			return parseInt(this.pointCountSlider.val());
		}


		getGeneratorButton()
		{
			return this.generatorButton;
		}


		getQuickHullButton()
		{
			return this.quickHullButton;
		}


		getGiftWrappingButton()
		{
			return this.giftWrappingButton;
		}


		getPrimitiveButton()
		{
			return this.primitiveButton;
		}


		getClearButton()
		{
			return this.clearButton;
		}

	}

}
