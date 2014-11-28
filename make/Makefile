all: typescript shrinkJS shrinkCSS

typescript:
	tsc --out ../script.js ../ts/script.ts

shrinkJS:
	java -jar compiler.jar --js ../script.js --js_output_file ../script.js

shrinkCSS:
	java -jar yuicompressor-2.4.7.jar --type css -o ../screen.css screen.css
