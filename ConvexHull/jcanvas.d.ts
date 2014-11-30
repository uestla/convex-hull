interface JQuery {
	drawLayers(): JQuery;
	clearCanvas(): JQuery;
	removeLayers(): JQuery;
	drawArc(options: any): JQuery;
	drawLine(options: any): JQuery;
	drawText(options: any): JQuery;
	removeLayer(name: string): JQuery;
	removeLayerGroup(name: string): JQuery;
	setLayer(name: string, options: any): JQuery;
	setLayerGroup(name: string, options: any): JQuery;

	attr(name: string, value: boolean): JQuery;
}
