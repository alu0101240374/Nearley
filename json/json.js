// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const nm = require('nearley-moo');
const tokens = require('./json-tokens.js');

nm(tokens);
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "S", "symbols": ["OBJECT"]},
    {"name": "S", "symbols": ["ARRAY"]},
    {"name": "OBJECT$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "OBJECT$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, "PROPERTY"]},
    {"name": "OBJECT$ebnf$1$subexpression$1$ebnf$1", "symbols": ["OBJECT$ebnf$1$subexpression$1$ebnf$1", "OBJECT$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "OBJECT$ebnf$1$subexpression$1", "symbols": ["PROPERTY", "OBJECT$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "OBJECT$ebnf$1", "symbols": ["OBJECT$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "OBJECT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "OBJECT", "symbols": [lb, "OBJECT$ebnf$1", rb]},
    {"name": "ARRAY$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "ARRAY$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, "VALUE"]},
    {"name": "ARRAY$ebnf$1$subexpression$1$ebnf$1", "symbols": ["ARRAY$ebnf$1$subexpression$1$ebnf$1", "ARRAY$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ARRAY$ebnf$1$subexpression$1", "symbols": ["VALUE", "ARRAY$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "ARRAY$ebnf$1", "symbols": ["ARRAY$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ARRAY$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY", "symbols": [lsqr, "ARRAY$ebnf$1", rsqr]},
    {"name": "PROPERTY", "symbols": [string, colon, "VALUE"], "postprocess": (d) => console.log(d)},
    {"name": "VALUE", "symbols": [number], "postprocess": id},
    {"name": "VALUE", "symbols": [string], "postprocess": id},
    {"name": "VALUE", "symbols": [trueToken], "postprocess": id},
    {"name": "VALUE", "symbols": [falseToken], "postprocess": id},
    {"name": "VALUE", "symbols": [nullToken], "postprocess": id},
    {"name": "VALUE", "symbols": ["ARRAY"]},
    {"name": "VALUE", "symbols": ["OBJECT"]}
]
  , ParserStart: "S"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
