/// <reference path="Canvas.ts" />
/// <reference path="Program.ts" />


interface Window {
	jQuery: JQuery;
}


(function (window, $) {

	var canvas = new Canvas($('#canvas'), 50);

	var controls = new Controls(
		$('#point-count'),
		$('#point-count-info'),
		$('#generate'),
		$('#alg-quick-hull'),
		$('#alg-gift-wrapping'),
		$('#alg-primitive'),
		$('#clear')
	);

	var program = new Program(canvas, controls);
	program.run();

})(window, window.jQuery);
