const dot = /(?<dot>[.])/;
const constToken = /(?<const>const)/;
const comma = /(?<comma>,)/;
const semicolon = /(?<semicolon>[;])/;
const varToken = /(?<var>var)/;
const procedure = /(?<procedure>procedure)/;
const semieq = /(?<semieq>:=)/;
const call = /(?<call>call)/;
const questionmark = /(?<questionmark>\?)/;
const exclamation = /(?<exclamation>!)/;
const begin = /(?<begin>begin)/;
const end = /(?<end>end)/;
const ifToken = /(?<if>if)/;
const then = /(?<then>then)/;
const whileToken = /(?<while>while)/;
const doToken = /(?<do>do)/;
const odd = /(?<odd>odd)/;
const equal = /(?<equal>=)/;
const hashtag = /(?<hashtag>#)/;
const minor = /(?<minor><)/;
const minoreq = /(?<minoreq><=)/;
const greater = /(?<greater>>)/;
const greatereq = /(?<greatereq>>=)/;
const add = /(?<add>\+)/;
const substract = /(?<substract>-)/;
const mul = /(?<null>\*)/;
const div = /(?<div>\/)/;
const lp = /(?<lp>\()/;
const rp = /(?<rp>\))/;
const number = /(?<number>[0-9]+)/;
const ident = /(?<ident>[a-z](?:[^()\[\];:=,.\s])*)/;
const ws = /(?<ws>[\r\n\s ]+)/;

const myTokens = [ 
  ws,
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
]

function unifyRegexp(tokens) {
  let allRegex = tokens.map(t => t.source);
  let unifiedRegex = allRegex.join('|');
  return new RegExp(unifiedRegex, 'uy');
}

function main() {
  let regex = unifyRegexp(myTokens);
}

main();