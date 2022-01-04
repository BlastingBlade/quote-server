#!/usr/bin/env node
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { replacer, randomQuote } from "./lib.js";

let port = 8000;
const indexFile = "./index.html";

if (parseInt(process.argv[2]))
	port = parseInt(process.argv[2]);

let index_html;
let index_html_promise = readFile(indexFile)
	.then(contents => {
		index_html = contents;
	})
	.catch(err => {
		console.error(`Could not read ${indexFile} file: ${err}`);
		process.exit(1);
	});

const requestListener = function (req, res) {
	var content = replacer(index_html, randomQuote());
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.end(content);
};

const server = http.createServer(requestListener);

await index_html_promise;
server.listen(port);
