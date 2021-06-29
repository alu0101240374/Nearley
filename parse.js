const nearley = require("nearley");
const moo = require("moo");
const grammar = require("./egg.js");

const tokens = require("./egg-tokens.js");
const lexer = moo.compile(tokens);
const nearleyMoo = require("nearley-moo");
const nm = nearleyMoo.parser(nearley, grammar);
//const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  const parser = nm(lexer);
  parser.ignore(['ws']);
  parser.feed("print(\"hello\")");
  console.log("Parse succes!", parser.results);
} catch (e) {
  console.log("Parse failed", e.message);
}