let {unifyRegexp, myTokens, parseS, lex} = require('./json-parser.js');

function main() {
  let regex = unifyRegexp(myTokens);
  let programTokens = lex(`{
    "name":"John",
    "age":30,
    "cars":["Ford", "BMW", "Fiat"]
    }`, regex);

  let lookahead;
  parseS(programTokens, lookahead);
}

main();