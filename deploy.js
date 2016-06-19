var path = require("path");
var CWS = require("chrome-webstore-manager");
var zipFolder = require("zip-folder");

function checkVariable(variable) {
	if (typeof process.env[variable] != "string") {
		console.log("Visit https://gitlab.com/iPlug/iplug/variables and add missing %s variable", variable);
		process.exit(1);
	}
}

checkVariable("EXTENSION_ID")
checkVariable("CLIENT_SECRET");
checkVariable("CLIENT_ID");

var chromeWebStore = new CWS(process.env["CLIENT_ID"], process.env["CLIENT_SECRET"]);

if (typeof process.env["TOKEN"] != "string") {
	console.log(chromeWebStore.getCodeUrl());
	console.log("Please visit \n%s\nthen set TOKEN variable on https://gitlab.com/iPlug/iplug/variables", "https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=114021718525-26bjbrg3ju9qv4co3uqa1glm9qlqpbn6.apps.googleusercontent.com&redirect_uri=urn:ietf:wg:oauth:2.0:oob");
	console.log("Don't forget to clear logs! (TOKEN = SENSITIVE DATA)");
}

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
