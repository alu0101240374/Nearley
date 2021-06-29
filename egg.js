// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const nm = require('nearley-moo');
const tokens = require('./egg-tokens.js');

nm(tokens);

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "expression", "symbols": ["STRING"]},
    {"name": "expression", "symbols": ["NUMBER"]},
    {"name": "expression", "symbols": ["WORD", "apply"], "postprocess": 
        function (data) {
          if (!data[1]) return data[0];
          return `{"type": "apply", "operator": ${data[0]}, "args": [${data[1]}]}`
        }
                    },
    {"name": "apply", "symbols": [], "postprocess": () => { return null }},
    {"name": "apply$ebnf$1", "symbols": []},
    {"name": "apply$ebnf$1$subexpression$1", "symbols": ["expression", comma]},
    {"name": "apply$ebnf$1", "symbols": ["apply$ebnf$1", "apply$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "apply$ebnf$2", "symbols": ["expression"], "postprocess": id},
    {"name": "apply$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "apply", "symbols": [LP, "apply$ebnf$1", "apply$ebnf$2", RP, "apply"], "postprocess": 
        function (data) {
            console.log('apply')
          let result = [];
          data[1].forEach((element) => {
            element.splice(1, 3);
            result.push(element);
          })
          if (data[2].length > 0) result.push(data[2]);
          return result;
        }
                    },
    {"name": "STRING", "symbols": [string], "postprocess": 
        function (data) {
          return `{"type": "value", "value": ${data[0]}}`;
        }
        },
    {"name": "NUMBER$ebnf$1", "symbols": [number]},
    {"name": "NUMBER$ebnf$1", "symbols": ["NUMBER$ebnf$1", number], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$1"], "postprocess": 
        function (data) {
          return `{"type: "value", "value": "${data[0].join("")}"}`;
        }
        },
    {"name": "WORD", "symbols": [word], "postprocess": 
        function (data) {
          return `{"type": "word", "value": "${data[0]}"}`
        }
        }
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
