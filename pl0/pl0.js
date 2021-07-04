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
    {"name": "program", "symbols": ["block", dot], "postprocess": 
        (d) => {
          return `{"type": apply, "op": {"type": word, "name": do}, args: [${d[0]}]}`;
        }
        },
    {"name": "block$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "block$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, ident, equal, number]},
    {"name": "block$ebnf$1$subexpression$1$ebnf$1", "symbols": ["block$ebnf$1$subexpression$1$ebnf$1", "block$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block$ebnf$1$subexpression$1", "symbols": [constToken, "IDENT", equal, number, "block$ebnf$1$subexpression$1$ebnf$1", semicolon]},
    {"name": "block$ebnf$1", "symbols": ["block$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [comma, "IDENT"]},
    {"name": "block$ebnf$2$subexpression$1$ebnf$1", "symbols": ["block$ebnf$2$subexpression$1$ebnf$1", "block$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block$ebnf$2$subexpression$1", "symbols": [varToken, "IDENT", "block$ebnf$2$subexpression$1$ebnf$1", semicolon]},
    {"name": "block$ebnf$2", "symbols": ["block$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "block$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block$ebnf$3", "symbols": []},
    {"name": "block$ebnf$3$subexpression$1", "symbols": [procedure, "IDENT", semicolon, "block", semicolon]},
    {"name": "block$ebnf$3", "symbols": ["block$ebnf$3", "block$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "block", "symbols": ["block$ebnf$1", "block$ebnf$2", "block$ebnf$3", "statement"], "postprocess": 
        (d) => {
          let nodes = '';
          if (d[0]) {
            nodes += `{"type": apply, "op": {"type": word, "name": defineConst}, args: [${d[0][1]}, ${d[0][3]}]}`;
            if (typeof d[0][4] !== 'undefined') {
              for (let i = 0; i < d[0][4].length; i++) {
                nodes += `, {"type": apply, "op": {"type": word, "name": defineConst}, args: [${d[0][4][i][1]}, ${d[0][4][i][3]}]}`;
              }
            }
          }
          if (d[1]) {
            nodes += `{"type": apply, "op": {"type": word, "name": define}, args: [${d[1][1]}, {"type": value, "value": 0}]}`;
            if (typeof d[1][2] !== 'undefined') {
              for (let i = 0; i < d[1][2].length; i++) {
                nodes += `, {"type": apply, "op": {"type": word, "name": define}, args: [${d[1][2][i][1]}, {"type": value, "value": 0}]}`;
              }
            }
          }
          if (typeof d[2] !== 'undefined' && d[2].length > 0) {
            for (let i = 0; i < d[2].length; i++) {
              nodes += `{"type": apply, "op": {"type": word, "name": fun}, args: [${d[2][i][1]}, ${d[2][i][3]}]}`;
            }
          }
          if (d[3]) {
            nodes += d[3];
          } 
          return nodes;
        }
                },
    {"name": "statement", "symbols": [], "postprocess": () => { return null }},
    {"name": "statement", "symbols": ["IDENT", semieq, "expression"], "postprocess": 
        (d) => {
          return `{"type": apply, "op": {"type": word, "name": define}, args: [${d[0]}, ${d[2]}]}`;
        }
                  },
    {"name": "statement", "symbols": [call, "IDENT"], "postprocess": 
        (d) => {
          return `{"type": apply, "op": {"type": word, "name": ${d[1]}}, args: []}`;
        }
                  },
    {"name": "statement", "symbols": [questionmark, ident]},
    {"name": "statement", "symbols": [exclamation, ident], "postprocess": 
        (d) => {
          return `{"type": apply, "op": {"type": word, "name": print}, args: [${d[1]}]}`;
        }
                  },
    {"name": "statement$ebnf$1", "symbols": []},
    {"name": "statement$ebnf$1$subexpression$1", "symbols": [semicolon, "statement"]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "statement$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": [begin, "statement", "statement$ebnf$1", end], "postprocess": 
        (d) => {
          let args = [];
          args.push(d[1]);
          if (typeof d[2] !== 'undefined') {
            for (let i = 0; i < d[2].length; i++) {
              if (d[2][i][1]) args.push(d[2][i][1]);
            }
          }
          //console.log(args)
          return `{"type": apply, "op": {"type": word, "name": weboooo}, args: [${args}]}`;
        }
                  },
    {"name": "statement", "symbols": [ifToken, "condition", then, "statement"], "postprocess": 
        (d) => {
          return `{"type": apply, "op": {"type": word, "name": if}, args: [${d[1]}, ${d[3]}]}`;
        }
                  },
    {"name": "statement", "symbols": [whileToken, "condition", doToken, "statement"], "postprocess": 
        (d) => {
          console.log('hola')
          return `{"type": apply, "op": {"type": word, "name": while}, args: [${d[1]}, ${d[3]}]}`;
        }
                  },
    {"name": "condition", "symbols": [odd, "expression"]},
    {"name": "condition$subexpression$1", "symbols": [equal]},
    {"name": "condition$subexpression$1", "symbols": [hashtag]},
    {"name": "condition$subexpression$1", "symbols": [minor]},
    {"name": "condition$subexpression$1", "symbols": [minoreq]},
    {"name": "condition$subexpression$1", "symbols": [greater]},
    {"name": "condition$subexpression$1", "symbols": [greatereq]},
    {"name": "condition", "symbols": ["expression", "condition$subexpression$1", "expression"], "postprocess": 
        (d) => {
          return `{"type": apply, "op": ${d[1]}, args: [${d[0]}, ${d[1]}]}`;
        }
        },
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
    {"name": "expression", "symbols": ["expression$ebnf$1", "term", "expression$ebnf$2"], "postprocess":  (d) => {
          let currentOperation = "";
          if (!d[0]) {//significa que no es un número negativo o positivo
            currentOperation = d[1];
          } else {
            currentOperation = `{"type": value, "value": ${d[1]}}`;
          }
          let i = 0;
          while (typeof d[2] !== 'undefined' && i < d[2].length) { //realizamos todas las operaciones aritmeticas
            let tmp = `{"type": apply, "op": ${d[2][i][0]}, "args": [${currentOperation}, ${d[2][i][1]}]}`;
            currentOperation = tmp;
            i++;
          }
          return currentOperation;
        }
        },
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [mul]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [div]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": ["term$ebnf$1$subexpression$1$subexpression$1", "factor"]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["factor", "term$ebnf$1"], "postprocess":  (d) => {
        if (typeof d[1] === 'undefined')
          return d[0];
        let i = 0;
        let currentOperation = d[0];
        while (typeof d[1] !== 'undefined' && i < d[1].length) { //realizamos todas las operaciones aritmeticas
          let tmp = `{"type": apply, "op": {"type": word, "name": ${d[1][i][0][0].value}}, "args": [${currentOperation}, ${d[1][i][1]}]}`;
          currentOperation = tmp;
          i++;
        }
        return currentOperation;
        }  
        },
    {"name": "factor", "symbols": [ident], "postprocess":  (d) => {
          return `{"type": word, "name": ${d[0]}}`;
        } },
    {"name": "factor", "symbols": [number], "postprocess":  (d) => { 
          return `{"type": value, "value": ${d[0]}}`; 
        } },
    {"name": "factor", "symbols": [lp, "expression", rp], "postprocess":  (d) => {
        return d[1];
        } },
    {"name": "IDENT", "symbols": [ident], "postprocess": d => `{"type": word, "name": ${d[0]}}`}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
