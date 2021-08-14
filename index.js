import http from 'node:http';
import fs from 'node:fs/promises';
import { replacer, randomQuote } from "./lib.js";

const port = 8000;
const indexFile = "./index.html";

let index_html;

const requestListener = function (req, res) {
	var content = replacer(index_html, randomQuote());
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.end(content);
};

const server = http.createServer(requestListener);

fs.readFile(indexFile)
	.then(contents => {
		index_html = contents;
		server.listen(port);
	})
	.catch(err => {
		console.error(`Could not read ${indexFile} file: ${err}`);
		process.exit(1);
	});
