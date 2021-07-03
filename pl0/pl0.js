// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const tokens = require('./pl0-tokens.js');
const nm = require('nearley-moo');

nm(tokens);
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program", "symbols": ["block", dot]},
    {"name": "block$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "block$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, ident, equal, number]},
    {"name": "block$ebnf$1$subexpression$1$ebnf$1", "symbols": ["block$ebnf$1$subexpression$1$ebnf$1", "block$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block$ebnf$1$subexpression$1", "symbols": [constToken, ident, equal, number, "block$ebnf$1$subexpression$1$ebnf$1", semicolon]},
    {"name": "block$ebnf$1", "symbols": ["block$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, ident]},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1", "symbols": ["block$ebnf$2$subexpression$1$ebnf$1", "block$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block$ebnf$2$subexpression$1", "symbols": [varToken, ident, "block$ebnf$2$subexpression$1$ebnf$1", semicolon]},
    {"name": "block$ebnf$2", "symbols": ["block$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "block$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block$ebnf$3", "symbols": []},
    {"name": "block$ebnf$3$subexpression$1", "symbols": [procedure, ident, semicolon, "block", semicolon]},
    {"name": "block$ebnf$3", "symbols": ["block$ebnf$3", "block$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block", "symbols": ["block$ebnf$1", "block$ebnf$2", "block$ebnf$3", "statement"]},
    {"name": "statement", "symbols": []},
    {"name": "statement", "symbols": [ident, semieq, "expression"]},
    {"name": "statement", "symbols": [call, ident]},
    {"name": "statement", "symbols": [questionmark, ident]},
    {"name": "statement", "symbols": [exclamation, ident]},
    {"name": "statement$ebnf$1", "symbols": []},
    {"name": "statement$ebnf$1$subexpression$1", "symbols": [semicolon, "statement"]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "statement$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": [begin, "statement", "statement$ebnf$1", end]},
    {"name": "statement", "symbols": [ifToken, "condition", then, "statement"]},
    {"name": "statement", "symbols": [whileToken, "condition", doToken, "statement"]},
    {"name": "condition", "symbols": [odd, "expression"]},
    {"name": "condition$subexpression$1", "symbols": [equal]},
    {"name": "condition$subexpression$1", "symbols": [hashtag]},
    {"name": "condition$subexpression$1", "symbols": [minor]},
    {"name": "condition$subexpression$1", "symbols": [minoreq]},
    {"name": "condition$subexpression$1", "symbols": [greater]},
    {"name": "condition$subexpression$1", "symbols": [greatereq]},
    {"name": "condition", "symbols": ["expression", "condition$subexpression$1", "expression"]},
    {"name": "expression$ebnf$1$subexpression$1", "symbols": [add]},
    {"name": "expression$ebnf$1$subexpression$1", "symbols": [substract]},
    {"name": "expression$ebnf$1", "symbols": ["expression$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "expression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expression$ebnf$2", "symbols": []},
    {"name": "expression$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [add]},
    {"name": "expression$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [substract]},
    {"name": "expression$ebnf$2$subexpression$1$ebnf$1", "symbols": ["expression$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "expression$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expression$ebnf$2$subexpression$1", "symbols": ["expression$ebnf$2$subexpression$1$ebnf$1", "term"]},
    {"name": "expression$ebnf$2", "symbols": ["expression$ebnf$2", "expression$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression", "symbols": ["expression$ebnf$1", "term", "expression$ebnf$2"]},
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [mul]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [div]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": ["term$ebnf$1$subexpression$1$subexpression$1", "factor"]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["factor", "term$ebnf$1"]},
    {"name": "factor", "symbols": [ident]},
    {"name": "factor", "symbols": [number]},
    {"name": "factor", "symbols": [lp, "expression", rp]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
