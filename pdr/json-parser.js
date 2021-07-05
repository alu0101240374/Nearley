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
    //console.log(match.groups)
    if (typeof match.groups[key] !== 'undefined') {
      //console.log(match.groups[key])
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
      let token = `{"type": "${type}", "value": '${match.groups[type]}', "offset": ${offset}}`;
      offset += match.groups[type].length;
      tokens.push(token);
    }
  }
  if (offset < program.length) {
    throw new TypeError('Error en ' + offset);
  }
  console.log(tokens);
  return tokens;
}

function main() {
  let regex = unifyRegexp(myTokens);
  lex(`{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}`, regex);
}

main();