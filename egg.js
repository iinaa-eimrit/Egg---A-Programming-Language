const { parse } = require('./parser');
const { evaluate } = require('./evaluator');
const { specialForms } = require('./special-forms');
const { topScope, run } = require('./environment');

// Inject the evaluate function into specialForms
Object.values(specialForms).forEach(form => {
  if (typeof form === 'function') {
    form.evaluate = evaluate;
  }
});

// Example usage
const program = `
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`;

console.log("Running Egg program:");
console.log(program);
console.log("\nOutput:");
const result = run(program);
console.log("Program execution completed. Result:", result);

