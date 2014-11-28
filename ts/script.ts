/// <reference path="Canvas.ts" />
/// <reference path="Program.ts" />


interface Window {
	jQuery: JQuery;
}


(function (window, $) {

	var canvas = new Canvas($('#canvas'), 50);

	var controls = new Controls();
	controls.pointCountSlider = $('#point-count');
	controls.pointCountInfo = $('#point-count-info');
	controls.generatorButton = $('#generate');
	controls.quickHullButton = $('#alg-quick-hull');
	controls.giftWrappingButton = $('#alg-gift-wrapping');
	controls.primitiveButton = $('#alg-primitive');
	controls.clearButton = $('#clear');

	var program = new Program(canvas, controls);
	program.run();

})(window, window.jQuery);
