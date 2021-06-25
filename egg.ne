@builtin "whitespace.ne"

expression -> STRING
            | NUMBER
            | WORD apply {%
              function (data) {
                if (!data[1]) return data[0];
                return `{"type": "apply", "operator": ${data[0]}, "args": [${data[1]}]}`
              }
            %}

apply      -> null {% () => { return null } %}
            | "(" (expression "," ):* expression:? ")" apply {%
              function (data) {
                let result = [];
                data[1].forEach((element) => {
                  element.splice(1, 3);
                  result.push(element);
                })
                if (data[2].length > 0) result.push(data[2]);
                return result;
              }
            %}

STRING -> "\"" characters "\"" {%
  function (data) {
    return `{"type": "value", "value": "${data[1].join("")}"}`;
  }
%}

characters -> character:+ {% id %}

character -> [^\"] {% id %}

NUMBER -> [0-9]:+ {%
  function (data) {
    return `{"type: "value", "value": "${data[0].join("")}"}`;
  }
%}

WORD -> letter [^\s(){},"\:.\]\[]:* {%
  function (data) {
    return `{"type": "word", "value": "${data[0] + data[1].join("")}"}`
  }
%}

letter -> [a-zA-Z] {% id %}
