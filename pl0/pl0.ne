@{%
const tokens = require('./pl0-tokens.js');
const nm = require('nearley-moo');

nm(tokens);
%}

program -> block %dot

block -> null 
        (%constToken %ident %equal %number (%comma %ident %equal %number):* %semicolon):?
        (%varToken %ident (%comma %ident):* %semicolon):?
        (%procedure %ident %semicolon block %semicolon):* statement

statement -> null
          | %ident %semieq expression 
          | %call %ident
          | %questionmark %ident
          | %exclamation %ident
          | %begin statement (%semicolon statement):* %end
          | %ifToken condition %then statement
          | %whileToken condition %doToken statement

condition -> %odd expression
          | expression (%equal|%hashtag|%minor|%minoreq|%greater|%greatereq) expression

expression -> (%add|%substract):? term ((%add|%substract):? term):* {% (d) => {
    let currentOperation = "";
    if (typeof d[0] === 'undefined')
      currentOperation = d[1]};
    else {
      currentOperation = `{"type": value, "value": ${d[1]}}`;
    }
    let i = 0;
    while (d[2].length > i) {
      let tmp = `{"type": apply, "op": ${d[2][i][0]}, "args": [${currentOperation}, ]}`;
    }
  };
%}

term -> factor ((%mul|%div) factor):* {% (d) => {
  if (typeof d[1] === 'undefined')
    return d[0];
  
  return `{"type": apply, "op": ${d[1][0]}, "args": [${d[0]}, ${d[1][1]}]}`
  }  
%}

factor -> %ident {% (d) => return `{"type": word, "name": ${d[0]}}`; %}
        | %number {% (d) => return `{"type": value, "value": ${d[0]}}`; %}
        | %lp expression %rp {% (d) => return d[1]; %}