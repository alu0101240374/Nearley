@builtin "whitespace.ne"

@{%
const nm = require('nearley-moo');
const tokens = require('./egg-tokens.js');

nm(tokens);

%}

expression -> STRING
            | NUMBER
            | WORD apply {%
              function (data) {
                if (!data[1]) return data[0];
                return `{"type": "apply", "operator": ${data[0]}, "args": [${data[1]}]}`
              }
            %}

apply      -> null {% () => { return null } %}
            | %LP (expression %comma):* expression:? %RP apply {%
              function (data) {
                  console.log('apply')
                let result = [];
                data[1].forEach((element) => {
                  element.splice(1, 3);
                  result.push(element);
                })
                if (data[2].length > 0) result.push(data[2]);
                return result;
              }
            %}

STRING -> %string {%
  function (data) {
    return `{"type": "value", "value": ${data[0]}}`;
  }
%}

NUMBER -> %number:+ {%
  function (data) {
    return `{"type: "value", "value": "${data[0].join("")}"}`;
  }
%}

WORD -> %word {%
  function (data) {
    return `{"type": "word", "value": "${data[0]}"}`
  }
%}
