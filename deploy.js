var path = require("path");
var CWS = require("chrome-webstore-manager");
var zipFolder = require("zip-folder");

function checkVariable(variable) {
	if (typeof process.env[variable] != "string") {
		console.log("Visit https://gitlab.com/iPlug/iplug/variables and add missing %s variable", variable);
		process.exit(1);
	}
}

process.env["CLIENT_SECRET"] = "Kappa"; //can it be changed and saved?

checkVariable("CLIENT_SECRET");
checkVariable("CLIENT_ID");

var filepath = path.resolve(__dirname, "package.zip");
var dirpath = path.resolve(__dirname, "Chrome");

console.log("Zipping %s\ninto: %s", dirpath, filepath);

zipFolder(dirpath, filepath, function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Zipped!");
});
