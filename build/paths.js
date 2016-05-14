var path = require("path");
var fs = require("fs");

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const srcRoot = "src";
const outRoot = "wwwroot";
const tsdMainFile = "typings/browser.d.ts";

module.exports = {
	output: {
		root: outRoot,
		dist: `${outRoot}/dist`
	},
	src: {
		root: srcRoot,
		tsd: tsdMainFile,
		ts: `./${srcRoot}/**/*.ts`,
		html: `./${srcRoot}/app/**/*.html`,
		sass: [`./${srcRoot}/app/**/*.scss`, `./${srcRoot}/assets/styles/**/*.scss`],
		imgs: `./${srcRoot}/assets/**/*.{png,jpeg,jpg}`,
		indexHtml: `./${srcRoot}/index.html`
	},
	sass: {
		includePaths: ["./src/assets/styles"]
	},
	doc: "./doc",
	packageName: pkg.name
};