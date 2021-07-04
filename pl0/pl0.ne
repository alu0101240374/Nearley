@{%
const tokens = require('./pl0-tokens.js');
const nm = require('nearley-moo');

nm(tokens);
%}

program -> block %dot {%
  (d) => {
    return `{"type": apply, "op": {"type": word, "name": do}, args: [${d[0]}]}`;
  }
%}

block -> null 
        (%constToken IDENT %equal %number (%comma %ident %equal %number):* %semicolon):? 
        (%varToken IDENT (%comma IDENT):* %semicolon):?
        (%procedure IDENT %semicolon block %semicolon):* statement {%
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
        %}

statement -> null {% () => { return null } %}
          | IDENT %semieq expression {%
            (d) => {
              return `{"type": apply, "op": {"type": word, "name": define}, args: [${d[0]}, ${d[2]}]}`;
            }
          %}
          | %call IDENT {%
            (d) => {
              return `{"type": apply, "op": {"type": word, "name": ${d[1]}}, args: []}`;
            }
          %}
          | %questionmark %ident 
          | %exclamation %ident {%
            (d) => {
              return `{"type": apply, "op": {"type": word, "name": print}, args: [${d[1]}]}`;
            }
          %}
          | %begin statement (%semicolon statement):* %end {%
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
          %}
          | %ifToken condition %then statement {%
            (d) => {
              return `{"type": apply, "op": {"type": word, "name": if}, args: [${d[1]}, ${d[3]}]}`;
            }
          %}
          | %whileToken condition %doToken statement {%
            (d) => {
              console.log('hola')
              return `{"type": apply, "op": {"type": word, "name": while}, args: [${d[1]}, ${d[3]}]}`;
            }
          %}

condition -> %odd expression
          | expression (%equal|%hashtag|%minor|%minoreq|%greater|%greatereq) expression {%
            (d) => {
              return `{"type": apply, "op": ${d[1]}, args: [${d[0]}, ${d[1]}]}`;
            }
%}

expression -> (%add|%substract):? term ((%add|%substract):? term):* {% (d) => {
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
%}

term -> factor ((%mul|%div) factor):* {% (d) => {
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
%}

factor -> %ident {% (d) => {
            return `{"type": word, "name": ${d[0]}}`;
          } %}
        | %number {% (d) => { 
          return `{"type": value, "value": ${d[0]}}`; 
        } %}
        | %lp expression %rp {% (d) => {
          return d[1];
          } %}

IDENT -> %ident {% d => `{"type": word, "name": ${d[0]}}` %}