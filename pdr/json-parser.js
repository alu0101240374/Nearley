const lb = /(?<Lb>[{])/;
const rb = /(?<Rb>[}])/;
const comma = /(?<Comma>[,])/;
const lsqr = /(?<Lsqr>[\[])/;
const rsqr = /(?<Rsqr>[\]])/;
const string = /(?<String>"(?:[^\\"]|\\.)*")/;
const colon = /(?<Colon>[:])/;
const number = /(?<Number>[0-9]+)/;
const trueToken = /(?<True>true)/;
const falseToken = /(?<False>false)/;
const nullToken = /(?<Null>null)/;
const ws = /(?<ws>[\r\n\t\s ]+)/;

const myTokens = [
  ws,
  lb,
  rb,
  comma,
  lsqr,
  rsqr,
  colon,
  number,
  trueToken,
  falseToken,
  nullToken,
  string
]

function getName(match) {
  for (let key in match.groups) {
    if (typeof match.groups[key] !== 'undefined') {
      return key;
    }
  }
}

function unifyRegexp(tokens) {
  let allRegex = tokens.map(t => t.source);
  let unifiedRegex = allRegex.join('|');
  return new RegExp(unifiedRegex, 'uy');
}

function lex(program, regex) {
  let match;
  let tokens = [];
  let offset = 0;
  while (match = regex.exec(program)) {
    if (typeof match !== 'undefined') {
      let type = getName(match);
      if (type === 'ws') {
        offset += match.groups[type].length;
        continue;
      }
      let token = {type: type, value: match.groups[type], offset: offset };
      offset += match.groups[type].length;
      tokens.push(token);
    }
  }
  if (offset < program.length) {
    throw new TypeError('Error en ' + offset);
  }
  //console.log(tokens);
  return tokens;
}

function getLookahead(tokens) {
  let lookahead = tokens[0];
  tokens = tokens.shift();
  //console.log(tokens)
  return lookahead;
}

function parseS(tokens, lookahead) {
  debugger;
  lookahead = getLookahead(tokens);
  if (lookahead.type === 'Lb') parseObject(tokens, lookahead);
  if (lookahead.type === 'Lsqr') parseArray(tokens, lookahead);
  
  lookahead = getLookahead(tokens);
  if (!lookahead) console.log('Todo en orden')
  else throw new SyntaxError('Cagaste en S');
}

function parseObject(tokens, lookahead) {
  //lookahead = getLookahead(tokens);
  if (lookahead.type !== 'Lb') throw new SyntaxError('Cagaste en el lb de object');
  lookahead = getLookahead(tokens);  
  if (lookahead.type === 'Rb') return;

  parseProperty(tokens, lookahead);
  debugger;
  lookahead = getLookahead(tokens);
  if (lookahead.type === 'Rb') return;
  while (lookahead.type === 'Comma') {
    lookahead = getLookahead(tokens);
    parseProperty(tokens, lookahead);
    lookahead = getLookahead(tokens);
  }
  if (lookahead.type === 'Rb') return;
  throw new SyntaxError('Falta bracket derecho')
}

function parseArray(tokens, lookahead) {
  //lookahead = getLookahead(tokens);
  if (lookahead.type !== 'Lsqr') throw new SyntaxError('Cagaste en el lb de object');
  lookahead = getLookahead(tokens);
  if (lookahead.type === 'Rsqr') return;

  parseValue(tokens, lookahead);
  lookahead = getLookahead(tokens);
  if (lookahead.type === 'Rsqr') return;
  while (lookahead.type === 'Comma') {
    lookahead = getLookahead(tokens);
    parseValue(tokens, lookahead);
    lookahead = getLookahead(tokens);
  }
  if (lookahead.type === 'Rsqr') return;
  throw new SyntaxError('Falta corchete derecho')
}

function parseProperty(tokens, lookahead) {
  if (lookahead.type !== 'String') throw new SyntaxError('Cagaste blando en property string');
  lookahead = getLookahead(tokens);
  if (lookahead.type !== 'Colon') throw new SyntaxError('Cagaste en property colon');
  lookahead = getLookahead(tokens);
  parseValue(tokens, lookahead);
}

function parseValue(tokens, lookahead) {
  if ((lookahead.type === 'Number')
  | (lookahead.type === 'String')
  | (lookahead.type === 'True')
  | (lookahead.type === 'False')
  | (lookahead.type === 'Null')) {
    return;
  }
  
  //lookahead = getLookahead(tokens);
  debugger;
  if (lookahead.type === 'Lsqr') { 
    parseArray(tokens, lookahead);
    return;
  }
  if (lookahead.type === 'Lb') {
    parseObject(tokens, lookahead)
    return;
  };
  
  throw new SyntaxError('Error en value');
}

module.exports = {myTokens, unifyRegexp, lex, parseS};
