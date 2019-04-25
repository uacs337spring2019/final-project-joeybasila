(function() {
	const express = require("express");
	const app = express();

	const fs = require("fs");

	app.use(express.static(__dirname));

	function get_categories(file_name){
		let json = {};
		let categories = [];
		let info = [];

		let file = fs.readFileSync(file_name, 'utf8');
		let lines = file.split("\n");
		for(let i = 0; i < lines.length; i++){
			if(lines[i][0] == "@"){
				categories.push(lines[i].substr(1, lines[i].length));
				let str = "";
				str = lines[i].substr(1,lines[i].length - 2);
				json[str] = lines[i + 1].split(",");
			}
		}
		json["categories"] = categories;

		return json;
	}

	console.log("web service started");
	app.get('/', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		let json = {};

		var title = req.query.title;
		var mode = req.query.mode;

		var file_name = "words.txt";

		json = get_categories(file_name);

		res.send(JSON.stringify(json));
	})
	app.listen(process.env.PORT);

})();
