/// <reference path="Point.ts" />
/// <reference path="Solver.ts" />
/// <reference path="Controls.ts" />


module ConvexHull
{

	export class Program
	{

		canvas: Canvas;
		controls: Controls;
		points: Point[] = [];


		constructor(canvas: Canvas, controls: Controls)
		{
			this.canvas = canvas;
			this.controls = controls;
		}


		run(): void
		{
			var onPointCountChange = () => {
				this.controls.getPointCountInfo().text(this.controls.getPointCount());
			}

			onPointCountChange();

			this.controls.getPointCountSlider().on('input change', (event) => {
				onPointCountChange();
			});


			this.processAlgButtons((button: JQuery) => {
				button.on('click', (event) => {
					this.setAlgButtonsDisabled(true);
				});
			});


			this.controls.getGeneratorButton().on('click', (event) => {
				this.generatePoints(this.controls.getPointCount());
				this.canvas.drawPoints(this.points);
				this.setAlgButtonsDisabled(false);
			});


			this.controls.getQuickHullButton().on('click', (event) => {
				this.runAlgorithm(Solver.quickHull, 'quick hull');
			});


			this.controls.getGiftWrappingButton().on('click', (event) => {
				this.runAlgorithm(Solver.giftWrapping, 'gift wrapping');
			});


			this.controls.getPrimitiveButton().on('click', (event) => {
				this.runAlgorithm(Solver.primitive, 'primitive');
			});


			this.controls.getClearButton().on('click', (event) => {
				this.canvas.clearSolution();
				this.setAlgButtonsDisabled(false);
			});
		}


		private generatePoints(num: number): void
		{
			this.points = [];

			while (this.points.length < num) {
				var duplicate = false;
				var x = this.canvas.getPadding() + Math.floor((this.canvas.getWidth() - 2 * this.canvas.getPadding()) * Math.random());
				var y = this.canvas.getPadding() + Math.floor((this.canvas.getHeight() - 2 * this.canvas.getPadding()) * Math.random());

				for (var i = 0, len = this.points.length; i < len; i++) {
					if (this.points[i].getX() === x || this.points[i].getY() === y) {
						duplicate = true;
						break;
					}
				}

				if (!duplicate) {
					this.points.push(new Point(x, y, i));
				}
			}
		}


		private runAlgorithm(callback: (points: Point[]) => Result, name: string): void
		{
			var start = (new Date()).getTime();
			var result = callback(this.points);
			var elapsed = (new Date()).getTime() - start;

			this.canvas.drawPolygon(result.getPolygon(), '#44f', '#99f');
			this.canvas.operationCountInfo(result.getCounter(), elapsed, name);
		}


		private setAlgButtonsDisabled(disabled: boolean = true): void
		{
			this.processAlgButtons((button: JQuery) => {
				button.attr('disabled', disabled ? true : null);
			});

			this.controls.getClearButton().attr('disabled', disabled ? null : true);
		}


		private processAlgButtons(callback: (button: JQuery) => void): void
		{
			var buttons = [ this.controls.getQuickHullButton(), this.controls.getGiftWrappingButton(), this.controls.getPrimitiveButton() ];

			for (var i = 0, len = buttons.length; i < len; i++) {
				callback(buttons[i]);
			}
		}

	}

}
