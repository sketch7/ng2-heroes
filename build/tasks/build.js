var gulp = require("gulp");
var runSeq = require("run-sequence");
var typescript = require("typescript");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");

var paths = require("../paths");

gulp.task("build", (cb) => {
	return runSeq(
		["compile:ts", "compile:sass", "html", "copy:imgs"],
		cb);
});

gulp.task("rebuild", (cb) => {
	return runSeq(
		"clean",
		"build",
		cb);
});

// scripts
gulp.task("compile:ts", () => {
	var tsProject = getTscProject();
	var tsResult = gulp.src([paths.src.typings, paths.src.ts])
		.pipe(plumber())
	//.pipe(changed(paths.output.dist, { extension: ".js" }))
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return tsResult.js
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(`${paths.output.dist}`));
});

function getTscProject() {
	return tsc.createProject("tsconfig.json", {
		sortOutput: true,
		typescript: typescript
	});
}

// sass
gulp.task("compile:sass", () => {
	return gulp.src(paths.src.sass)
		.pipe(sass({
			includePaths: paths.sass.includePaths
		}).on("error", sass.logError))
		.pipe(gulp.dest(`${paths.output.dist}/assets`));
});


// html
gulp.task("html", (cb) => {
	return runSeq(
		["compile:html", "compile:index-html"],
		cb);
});


gulp.task("compile:html", () => {
	return gulp.src(paths.src.html)
		.pipe(gulp.dest(`${paths.output.dist}/app`));
});

gulp.task("compile:index-html", () => {
	return gulp.src(paths.src.indexHtml)
		.pipe(gulp.dest(paths.output.root));
});


// images
gulp.task("copy:imgs", () => {
	return gulp.src(paths.src.imgs)
		.pipe(gulp.dest(`${paths.output.dist}/assets`));
});