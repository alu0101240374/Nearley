// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
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
    {"name": "apply$ebnf$1$subexpression$1", "symbols": ["expression", {"literal":","}]},
    {"name": "apply$ebnf$1", "symbols": ["apply$ebnf$1", "apply$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "apply$ebnf$2", "symbols": ["expression"], "postprocess": id},
    {"name": "apply$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "apply", "symbols": [{"literal":"("}, "apply$ebnf$1", "apply$ebnf$2", {"literal":")"}, "apply"], "postprocess": 
        function (data) {
          let result = [];
          data[1].forEach((element) => {
            element.splice(1, 3);
            result.push(element);
          })
          if (data[2].length > 0) result.push(data[2]);
          return result;
        }
                    },
    {"name": "STRING", "symbols": [{"literal":"\""}, "characters", {"literal":"\""}], "postprocess": 
        function (data) {
          return `{"type": "value", "value": "${data[1].join("")}"}`;
        }
        },
    {"name": "characters$ebnf$1", "symbols": ["character"]},
    {"name": "characters$ebnf$1", "symbols": ["characters$ebnf$1", "character"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "characters", "symbols": ["characters$ebnf$1"], "postprocess": id},
    {"name": "character", "symbols": [/[^\"]/], "postprocess": id},
    {"name": "NUMBER$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$1", "symbols": ["NUMBER$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$1"], "postprocess": 
        function (data) {
          return `{"type: "value", "value": "${data[0].join("")}"}`;
        }
        },
    {"name": "WORD$ebnf$1", "symbols": []},
    {"name": "WORD$ebnf$1", "symbols": ["WORD$ebnf$1", /[^\s(){},"\:.\]\[]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WORD", "symbols": ["letter", "WORD$ebnf$1"], "postprocess": 
        function (data) {
          return `{"type": "word", "value": "${data[0] + data[1].join("")}"}`
        }
        },
    {"name": "letter", "symbols": [/[a-zA-Z]/], "postprocess": id}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
