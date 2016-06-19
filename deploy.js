var fs = require("fs");
var path = require("path");
var CWS = require("chrome-webstore-manager");
var zipFolder = require("zip-folder");

var variablesLink = "https://gitlab.com/iPlug/iplug/variables";

function checkVariable(variable) {
	if (typeof process.env[variable] != "string") {
		console.log("Please visit:\n\n%s\n\nthen add missing %s variable", variablesLink, variable);
		process.exit(1);
	}
}

checkVariable("EXTENSION_ID")
checkVariable("CLIENT_SECRET");
checkVariable("CLIENT_ID");

var chromeWebStore = new CWS(process.env["CLIENT_ID"], process.env["CLIENT_SECRET"]);

if (typeof process.env["TOKEN"] != "string") {
	if (typeof process.env["CODE"] != "string") {
		console.log("Please visit:\n\n%s\n\nthen set CODE variable on https://gitlab.com/iPlug/iplug/variables", chromeWebStore.getCodeUrl());
		process.exit(1);
	} else {
		var token = chromeWebStore.getAccessToken(process.env["CODE"]);	
		token.then(function(a) {
			console.log("a", a);
		}, function(b) {
			console.log("b", b);
		});
		console.log(token);
		console.log("Please visit:\n\n%s\n\nthen remove CODE variable and add TOKEN variable = %s", variablesLink, token);
		console.log("AFTER YOU COPY TOKEN ERASE LOGS!");
		console.log("Don't forget to trigger rebuild :)");
		process.exit(1);
	}
}

console.log("All variables set :)");

var filepath = path.resolve(__dirname, "package.zip");
var dirpath = path.resolve(__dirname, "Chrome");

console.log("Zipping %s\ninto: %s", dirpath, filepath);

zipFolder(dirpath, filepath, function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Zipped!");
	console.log("Updating extension %s", process.env["EXTENSION_ID"]);
	var zip = fs.readFileSync(filepath);
	chromeWebStore.updateItem(process.env["TOKEN"], zip, function(data) {
		console.log(data);
	});
});
