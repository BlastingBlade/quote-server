import uniqueRandomArray from 'unique-random-array';
import { readFile } from 'node:fs/promises';

const quotesFile = './quotes.json';

let quotes;
let quotes_promise = readFile(quotesFile)
    .then(contents => {
        quotes = JSON.parse(contents);
    })
    .catch(err => {
        console.error(`Could not read ${quotesFile} file: ${err}`);
        process.exit(1);
    });

// https://stackoverflow.com/questions/34725097/replace-string-value-with-javascript-object#34727892
function replacer(template, obj) {
  var keys = Object.keys(obj);
  var func = Function(...keys, "return `" + template + "`;");

  return func(...keys.map(k => obj[k]));
}

await quotes_promise;
const getRandomQuote = uniqueRandomArray(quotes);
function randomQuote() {
    return getRandomQuote();
}

export { replacer, randomQuote };
