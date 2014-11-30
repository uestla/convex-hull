/// <reference path="Canvas.ts" />
/// <reference path="Program.ts" />
/// <reference path="Controls.ts" />


interface Window {
	jQuery: JQuery;
}


(function (window, $) {

	var canvas = new ConvexHull.Canvas($('#canvas'), 50);

	var controls = new ConvexHull.Controls(
		$('#point-count'),
		$('#point-count-info'),
		$('#generate'),
		$('#alg-quick-hull'),
		$('#alg-gift-wrapping'),
		$('#alg-primitive'),
		$('#clear')
	);

	var program = new ConvexHull.Program(canvas, controls);
	program.run();

})(window, window.jQuery);
