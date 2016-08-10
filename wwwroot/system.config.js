/*
* This config is only used during development and build phase only
* It will not be available on production
*
*/

(function (global) {
	// wildcard paths
	var paths = {
		"*": "dist/*",
		"n:*": "node_modules/*"
	};

	// map tells the System loader where to look for things
	var map = {
		"app": "app",
		"rxjs": "n:rxjs",
		"@angular": "n:@angular",
		"@ngrx": "n:@ngrx",
		"ngrx-store-logger": "n:ngrx-store-logger",
		"angular2-in-memory-web-api": "n:angular2-in-memory-web-api",
		"@ssv": "n:@ssv",
		"ssv-core": "n:ssv-core",
		"lodash": "n:lodash",
		"fuse": "n:fuse.js/src"
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		"app": { defaultExtension: "js" },
		"rxjs": { defaultExtension: "js" },
		"ngrx-store-logger": { main: "dist/index.js", defaultExtension: "js" },
		"angular2-in-memory-web-api": { defaultExtension: "js" },
		"ssv-core": { main: "dist/amd/index.js" },
		"@ssv/ng2-core": { main: "dist/amd/index.js" },
		"@ssv/ng2-command": { main: "dist/amd/index.js" },
		"fuse": { main: "fuse.js" }
	};

	var packageNames = [
		"@ngrx/core",
		"@ngrx/store",
		"@ngrx/effects",
		"lodash"
	];

	var ngPackageNames = [
		"common",
		"compiler",
		"core",
		"forms",
		"http",
		"platform-browser",
		"platform-browser-dynamic",
		"router",
		"router-deprecated",
		"upgrade",
	];

	// add package entries for angular packages in the form "@angular/common": { main: "index.js", defaultExtension: "js" }
	packageNames.forEach(function (pkgName) {
		packages[pkgName] = { main: "index.js", defaultExtension: "js" };
	});


	// @angular Individual files (~300 requests):
	function packIndex(pkgName) {
		packages["@angular/" + pkgName] = { main: "index.js", defaultExtension: "js" };
	}
	// @angular Bundled (~40 requests):
	function packUmd(pkgName) {
		packages["@angular/" + pkgName] = { main: "/bundles/" + pkgName + ".umd.js", defaultExtension: "js" };
	}
	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);

	var config = {
		map: map,
		packages: packages,
		paths: paths
	};

	System.config(config);

})(this);
