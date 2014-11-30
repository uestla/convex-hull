all: typescript shrinkJS shrinkCSS

typescript:
	tsc --out www/script.js ConvexHull/script.ts

shrinkJS:
	java -jar build/compiler.jar --js www/script.js --js_output_file www/script.js

shrinkCSS:
	java -jar build/yuicompressor-2.4.8.jar --type css -o www/screen.css screen.css
