const nearley = require("nearley");
const grammar = require("./egg.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  parser.feed("do(def(x,4),print(x))");
  console.log("Parse succes!", parser.results);
} catch (e) {
  console.log("Parse failed", e.message);
}