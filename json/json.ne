@{%
const nm = require('nearley-moo');
const tokens = require('./json-tokens.js');

nm(tokens);
%}

S -> OBJECT
    | ARRAY

OBJECT -> %lb (PROPERTY (%comma PROPERTY):*):? %rb 

ARRAY -> %lsqr (VALUE (%comma VALUE):*):? %rsqr 

PROPERTY -> %string %colon VALUE {%(d) => console.log(d)%}

VALUE -> %number {%id%}
        | %string {%id%}
        | %trueToken {%id%}
        | %falseToken {%id%}
        | %nullToken {%id%}
        | ARRAY
        | OBJECT
