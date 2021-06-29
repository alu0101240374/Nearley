const number = /[0-9]/;
const LP = /[(]/;
const RP = /[)]/;
const comma = /[,]/;
const string = /"[^"'\\]*"/;
const word = /[a-zA-Z][^\s(){},"\:.\]\[]*/;
const ws = /[\r\s\t\n ]+/;

const tokens = {
  ws: {match: ws, lineBreaks: true},
  number,
  string,
  word,
  LP,
  RP,
  comma
};

module.exports = tokens;