all: typescript shrinkJS shrinkCSS

typescript:
	tsc --out script.js ts/script.ts

shrinkJS:
	java -jar build/compiler.jar --js ./script.js --js_output_file script.js

shrinkCSS:
	java -jar build/yuicompressor-2.4.7.jar --type css -o screen.css build/screen.css
