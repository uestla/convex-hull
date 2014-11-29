var Point=function(){function b(a,c,d){void 0===d&&(d=-1);this.angle=0;this.x=a;this.y=c;this.i=d}b.prototype.getX=function(){return this.x};b.prototype.getY=function(){return this.y};b.prototype.getI=function(){return this.i};b.prototype.getAngle=function(){return this.angle};b.prototype.setAngle=function(a){this.angle=a;return this};return b}(),Canvas=function(){function b(a,c){this.canvas=a;this.padding=c;this.width=a.width();this.height=a.height()}b.prototype.getWidth=function(){return this.width};
b.prototype.getHeight=function(){return this.height};b.prototype.getPadding=function(){return this.padding};b.prototype.drawPoints=function(a){this.canvas.removeLayers().clearCanvas();for(var c=0,d=a.length;c<d;c++)this.drawPoint(""+c,a[c],"#000","#777")};b.prototype.drawPoint=function(a,c,d,e){this.canvas.drawArc({radius:3,layer:!0,x:c.getX(),y:c.getY(),strokeWidth:1,groups:["point"],fillStyle:e,name:"point."+a,strokeStyle:d})};b.prototype.highlightPoint=function(a,c,d){this.canvas.setLayer("point."+
a.getI(),{fillStyle:d,strokeStyle:c}).drawLayers()};b.prototype.drawPolygon=function(a,c,d){this.canvas.removeLayerGroup("polygon");for(var e=0,b=a.length;e<b;e++)this.highlightPoint(a[e],c,d),this.canvas.drawLine({layer:!0,strokeWidth:2,strokeStyle:d,groups:["polygon"],name:"polygonLine."+e,x1:a[e].getX(),y1:a[e].getY(),x2:a[(e+1)%b].getX(),y2:a[(e+1)%b].getY()})};b.prototype.operationCountInfo=function(a,c,d){this.canvas.drawText({x:10,y:428,layer:!0,fontSize:12,align:"left",fillStyle:"#777",fromCenter:!1,
name:"operationCount",text:a+" operations in "+c+"ms ("+d+")"})};b.prototype.clearSolution=function(){this.canvas.removeLayerGroup("polygon").removeLayer("operationCount").setLayerGroup("point",{fillStyle:"#777",strokeStyle:"#000"}).drawLayers()};return b}(),Controls=function(){function b(a,c,d,e,b,f,h){this.pointCountSlider=a;this.pointCountInfo=c;this.generatorButton=d;this.quickHullButton=e;this.giftWrappingButton=b;this.primitiveButton=f;this.clearButton=h}b.prototype.getPointCountSlider=function(){return this.pointCountSlider};
b.prototype.getPointCountInfo=function(){return this.pointCountInfo};b.prototype.getPointCount=function(){return parseInt(this.pointCountSlider.val())};b.prototype.getGeneratorButton=function(){return this.generatorButton};b.prototype.getQuickHullButton=function(){return this.quickHullButton};b.prototype.getGiftWrappingButton=function(){return this.giftWrappingButton};b.prototype.getPrimitiveButton=function(){return this.primitiveButton};b.prototype.getClearButton=function(){return this.clearButton};
return b}(),Result=function(){function b(){this.counter=0;this.polygon=[]}b.prototype.count=function(a){void 0===a&&(a=1);this.counter+=a;return this};b.prototype.getCounter=function(){return this.counter};b.prototype.addVertex=function(a){this.polygon.push(a);return this};b.prototype.getPolygon=function(){return this.polygon};b.prototype.sortPolygon=function(){this.polygon=Helpers.sortConvexPolygon(this.polygon);return this};return b}(),Helpers=function(){function b(){}b.sortConvexPolygon=function(a){for(var c=
this.findCentroid(a),d=0,e=a.length;d<e;d++)a[d].setAngle(Math.atan2(a[d].getY()-c.getY(),a[d].getX()-c.getX()));a.sort(function(a,c){return a.getAngle()-c.getAngle()});return a};b.findCentroid=function(a){for(var c=0,d=0,e=0,b=a.length;e<b;e++)c+=a[e].getX(),d+=a[e].getY();return new Point(c/b,d/b)};b.laysPointInTriangle=function(a,c,d,e){return 0>=(d.getY()-c.getY())*(c.getX()-a.getX())+(c.getX()-d.getX())*(c.getY()-a.getY())&&0>=(e.getY()-d.getY())*(d.getX()-a.getX())+(d.getX()-e.getX())*(d.getY()-
a.getY())&&0>=(c.getY()-e.getY())*(e.getX()-a.getX())+(e.getX()-c.getX())*(e.getY()-a.getY())};b.findExtremes=function(a){for(var c=null,d=null,e=0,b=a.length;e<b;e++){if(null===c||a[e].getX()<c.getX())c=a[e];if(null===d||a[e].getX()>d.getX())d=a[e]}return{min:c,max:d}};b.vectorsAngle=function(a,c){return Math.atan2(a[0]*c[1]-c[0]*a[1],a[0]*c[0]+a[1]*c[1])};b.findFarthestPointFromLineToTheLeft=function(a,c,d){for(var e=null,g=null,f=0,h=d.length;f<h;f++)if(d[f]!==a&&d[f]!==c&&b.isPointToTheLeftFromLine(d[f],
a,c)){var k=b.pointFromLineDistance(d[f],a,c);if(null===g||k>g)e=d[f],g=k}return e};b.splitPointsByTriangle=function(a,c,d,e){for(var g=[[],[]],f=0,h=e.length;f<h;f++)e[f]!==a&&e[f]!==c&&e[f]!==d&&(b.laysPointInTriangle(e[f],a,c,d)||(b.isPointToTheLeftFromLine(e[f],a,d)?g[0].push(e[f]):b.isPointToTheLeftFromLine(e[f],d,c)&&g[1].push(e[f])));return g};b.isPointToTheLeftFromLine=function(a,c,d){return 0>(d.getX()-c.getX())*(a.getY()-c.getY())-(d.getY()-c.getY())*(a.getX()-c.getX())};b.pointFromLineDistance=
function(a,c,d){var e=d.getX()-c.getX(),b=d.getY()-c.getY();return Math.abs(b*a.getX()-e*a.getY()+d.getX()*c.getY())/Math.sqrt(e*e+b*b)};return b}(),ConvexHull=function(){function b(){}b.quickHull=function(a){var c=new Result,d=Helpers.findExtremes(a),e=d.min,d=d.max;c.count(a.length);c.addVertex(e);c.addVertex(d);b._quickHull(e,d,a,c);b._quickHull(d,e,a,c);c.sortPolygon();return c};b._quickHull=function(a,c,d,e){if(d.length){var g=Helpers.findFarthestPointFromLineToTheLeft(a,c,d);e.addVertex(g);
e.count(d.length);var f=Helpers.splitPointsByTriangle(a,c,g,d);e.count(d.length);b._quickHull(a,g,f[0],e);b._quickHull(g,c,f[1],e)}};b.giftWrapping=function(a){var c=new Result,d=Helpers.findExtremes(a).max,b=d,g=[0,-1];do{c.count();c.addVertex(b);for(var f=null,h=null,k=null,l=0,p=a.length;l<p;l++)if(a[l]!==b){c.count();var m=[a[l].getX()-b.getX(),a[l].getY()-b.getY()],n=Helpers.vectorsAngle(g,m);if(null===f||n<f)f=n,h=m,k=a[l]}g=h;b=k}while(b!==d);return c};b.primitive=function(a){for(var c=new Result,
d=a.length,b=0;b<d;b++){for(var g=!0,f=0;g&&f<d;f++)if(b!==f)for(var h=0;g&&h<d;h++)if(b!==h&&f!==h)for(var k=0;g&&k<d;k++)b!==k&&f!==k&&h!==k&&(c.count(),Helpers.laysPointInTriangle(a[b],a[f],a[h],a[k])&&(g=!1));g&&c.addVertex(a[b])}c.sortPolygon();return c};return b}(),Program=function(){function b(a,c){this.points=[];this.canvas=a;this.controls=c}b.prototype.run=function(){var a=this,c=function(){a.controls.getPointCountInfo().text(a.controls.getPointCount())};c();this.controls.getPointCountSlider().on("input change",
function(a){c()});this.processAlgButtons(function(c){c.on("click",function(c){a.setAlgButtonsDisabled(!0)})});this.controls.getGeneratorButton().on("click",function(c){a.generatePoints(a.controls.getPointCount());a.canvas.drawPoints(a.points);a.setAlgButtonsDisabled(!1)});this.controls.getQuickHullButton().on("click",function(c){a.runAlgorithm(ConvexHull.quickHull,"quick hull")});this.controls.getGiftWrappingButton().on("click",function(c){a.runAlgorithm(ConvexHull.giftWrapping,"gift wrapping")});
this.controls.getPrimitiveButton().on("click",function(c){a.runAlgorithm(ConvexHull.primitive,"primitive")});this.controls.getClearButton().on("click",function(c){a.canvas.clearSolution();a.setAlgButtonsDisabled(!1)})};b.prototype.generatePoints=function(a){for(this.points=[];this.points.length<a;){for(var c=!1,b=this.canvas.getPadding()+Math.floor((this.canvas.getWidth()-2*this.canvas.getPadding())*Math.random()),e=this.canvas.getPadding()+Math.floor((this.canvas.getHeight()-2*this.canvas.getPadding())*
Math.random()),g=0,f=this.points.length;g<f;g++)if(this.points[g].getX()===b||this.points[g].getY()===e){c=!0;break}c||this.points.push(new Point(b,e,g))}};b.prototype.runAlgorithm=function(a,c){var b=(new Date).getTime(),e=a(this.points),b=(new Date).getTime()-b;this.canvas.drawPolygon(e.getPolygon(),"#44f","#99f");this.canvas.operationCountInfo(e.getCounter(),b,c)};b.prototype.setAlgButtonsDisabled=function(a){void 0===a&&(a=!0);this.processAlgButtons(function(c){c.attr("disabled",a?!0:null)});
this.controls.getClearButton().attr("disabled",a?null:!0)};b.prototype.processAlgButtons=function(a){for(var c=[this.controls.getQuickHullButton(),this.controls.getGiftWrappingButton(),this.controls.getPrimitiveButton()],b=0,e=c.length;b<e;b++)a(c[b])};return b}();(function(b,a){var c=new Canvas(a("#canvas"),50),d=new Controls(a("#point-count"),a("#point-count-info"),a("#generate"),a("#alg-quick-hull"),a("#alg-gift-wrapping"),a("#alg-primitive"),a("#clear"));(new Program(c,d)).run()})(window,window.jQuery);
