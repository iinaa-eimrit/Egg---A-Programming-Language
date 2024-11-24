const { evaluate } = require('./evaluator');
const { parse } = require('./parser');

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
  console.log(value);
  return value;
};

topScope.array = (...values) => values;
topScope.length = (array) => array.length;
topScope.element = (array, n) => array[n];

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

module.exports = { topScope, run };

