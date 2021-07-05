@{%
const tokens = require('./pl0-tokens.js');
const nm = require('nearley-moo');

nm(tokens);

const makeApply = (name, ...args) => {
  return `{"type": apply, "op": ${name}, args: [${args}]}`;
};

const makeWord = data => {
  return `{"type": word, "name": ${data}}`;
};

const makeValue = data => {
  return `{"type": value, "value": ${data}}`; 
}

const makeFactor = d => {
  if (typeof d[1] === 'undefined')
    return d[0];
  let i = 0;
  let currentOperation = d[0];
  while (typeof d[1] !== 'undefined' && i < d[1].length) { //realizamos todas las operaciones aritmeticas
    let tmp = makeApply(makeWord(d[1][i][0][0].value), currentOperation, d[1][i][1]);
    currentOperation = tmp;
    i++;
  }
  return currentOperation;
};

const makeExpression = d => {
  let currentOperation = "";
  if (!d[0]) {//significa que no es un número negativo o positivo
    currentOperation = d[1];
  } else {
    currentOperation = makeValue(d[1]);
  }
  let i = 0;
  while (typeof d[2] !== 'undefined' && i < d[2].length) { //realizamos todas las operaciones aritmeticas
    let tmp = makeApply(makeWord(d[2][i][0][0].value), currentOperation, d[2][i][1]);
    currentOperation = tmp;
    i++;
  }
  return currentOperation;
};

const makeBlock = d => {
  let nodes = '';
  if (d[0]) {
    node += makeApply(makeWord('defineConst'), d[0][1], d[0][3]);
    if (typeof d[0][4] !== 'undefined') {
      for (let i = 0; i < d[0][4].length; i++) {
        node += ',' + makeApply(makeWord('defineConst'), d[0][4][i][1], d[0][4][i][3]);
      }
    }
  }
  if (d[1]) {
    nodes += makeApply(makeWord('define'), d[1][1], makeValue(0));
    if (typeof d[1][2] !== 'undefined') {
      for (let i = 0; i < d[1][2].length; i++) {
        nodes += ',' + makeApply(makeWord('define'), d[1][2][i][1], makeValue(0));
      }
    }
  }
  if (typeof d[2] !== 'undefined' && d[2].length > 0) {
    for (let i = 0; i < d[2].length; i++) {
      nodes += ',' + makeApply(makeWord('fun'), d[2][i][1], d[2][i][3]);
    }
  }
  if (d[3]) {
    nodes += d[3];
  } 
  return nodes;
};

%}

program -> block %dot {% (d) => makeApply(makeWord('do'), d[0]) %}

block -> null 
        (%constToken IDENT %equal NUMBER (%comma %ident %equal NUMBER):* %semicolon):? 
        (%varToken IDENT (%comma IDENT):* %semicolon):?
        (%procedure IDENT %semicolon block %semicolon):* statement {% makeBlock %}

statement -> null {% () => { return null } %}
          | IDENT %semieq expression {% (d) => makeApply(makeWord('set'), d[0], d[2]) %}
          | %call IDENT {% (d) => makeApply(d[1]) %}
          | %questionmark IDENT 
          | %exclamation IDENT {% (d) => makeApply(makeWord('print'), d[1]) %}
          | %begin statement (%semicolon statement):* %end {%
            (d) => {
              let args = [];
              args.push(d[1]);
              if (typeof d[2] !== 'undefined') {
                for (let i = 0; i < d[2].length; i++) {
                  if (d[2][i][1]) args.push(d[2][i][1]);
                }
              }
              return `{"type": apply, "op": {"type": word, "name": do}, args: [${args}]}`;
            }
          %}
          | %ifToken condition %then statement {% (d) => makeApply(makeWord('if'), d[1], d[3]) %}
          | %whileToken condition %doToken statement {% (d) => makeApply(makeWord('while'), d[1], d[3]) %}

condition -> %odd expression
          | expression (%equal|%hashtag|%minor|%minoreq|%greater|%greatereq) expression {% (d) => makeApply(makeWord(d[1]), d[0], d[2]) %}

expression -> (%add|%substract):? term ((%add|%substract):? term):* {% makeExpression %}

term -> factor ((%mul|%div) factor):* {% makeFactor %}

factor -> IDENT {% id %}
        | NUMBER {% id %}
        | %lp expression %rp {% (d) => {
            return d[1];
          } %}

IDENT -> %ident {% d => makeWord(d[0]) %}

NUMBER -> %number {% (d) => makeValue(d[0]) %}