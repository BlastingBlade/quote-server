const http = require("http");
const fs = require('fs').promises;
const randomQuotes = require('random-quotes');

const port = 8000;
const indexFile= "/index.html";

let index_html;

// https://stackoverflow.com/questions/34725097/replace-string-value-with-javascript-object#34727892
function replacer(template, obj) {
  var keys = Object.keys(obj);
  var func = Function(...keys, "return `" + template + "`;");

  return func(...keys.map(k => obj[k]));
}

const requestListener = function (req, res) {
	content = replacer(index_html, randomQuotes.default());
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.end(content);
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + indexFile)
	.then(contents => {
		index_html = contents;
		server.listen(port);
	})
	.catch(err => {
		console.error(`Could not read ${indexFile} file: ${err}`);
		process.exit(1);
	});
