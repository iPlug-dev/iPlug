var path = require("path");
var CWS = require("chrome-webstore-manager");
var zipFolder = require("zip-folder");

var filepath = path.resolve(__dirname, "package.zip");
var dirpath = path.resolve(__dirname, "Chrome");

zipFolder(dirpath, filepath, function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Zipped directory :OO");	
}

//var file = fs.readFileSync(path);
