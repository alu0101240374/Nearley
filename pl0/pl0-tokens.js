const dot = /[.]/;
const constToken = /const/;
const comma = /,/;
const semicolon = /[;]/;
const varToken = /var/;
const procedure = /procedure/;
const semieq = /\:\=/;
const call = /call/;
const questionmark = /\?/;
const exclamation = /\!/;
const begin = /begin/;
const end = /end/;
const ifToken = /if/;
const then = /then/;
const whileToken = /while/;
const doToken = /do/;
const odd = /odd/;
const equal = /=/;
const hashtag = /#/;
const minor = /</;
const minoreq = /<=/;
const greater = />/;
const greatereq = />=/;
const add = /\+/;
const substract = /-/;
const mul = /\*/;
const div = /\//;
const lp = /\(/;
const rp = /\)/;
const number = /[0-9]+/;
const ident = /[a-z](?:[^()\[\];:=,.\s])*/;
const ws = /[\r\n\s ]+/;

const tokens = {
  ws: {match: ws, lineBreaks: true},
  dot,
  constToken,
  comma,
  semicolon,
  varToken,
  procedure,
  semieq,
  call,
  questionmark,
  exclamation,
  begin,
  end,
  ifToken,
  then,
  whileToken,
  doToken,
  odd,
  equal,
  hashtag,
  minoreq,
  minor,
  greatereq,
  greater,
  add,
  substract,
  mul,
  div,
  lp,
  rp,
  number,
  ident
}

module.exports = tokens;