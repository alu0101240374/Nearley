const nearley = require('nearley');
const moo = require('moo');
const nearleyMoo = require('nearley-moo');
const grammar = require('./pl0.js');
const tokens = require('./pl0-tokens.js');

const lexer = moo.compile(tokens);
const nm = nearleyMoo.parser(nearley, grammar);

try {
  const parser = nm(lexer);
  parser.ignore(['ws']);
  parser.feed(`var x, squ;
  
                procedure square;
                begin
                  squ:= x * x
                end;
                
                begin
                  x := 1;
                  while x <= 10 DO
                  begin
                      call square;
                      ! squ;
                      x := x + 1
                  end
                end.`);
  console.log("Parse succes!", parser.results);
} catch (error) {
  console.log("Parse failed", error.message);
}