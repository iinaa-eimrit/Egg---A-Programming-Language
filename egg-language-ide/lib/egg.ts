type Expression = {
  type: string;
  value?: any;
  name?: string;
  operator?: Expression;
  args?: Expression[];
};

type Scope = {
  [key: string]: any;
};

const specialForms: { [key: string]: Function } = Object.create(null);

function evaluate(expr: Expression, scope: Scope): any {
  if (expr.type === "value") {
    return expr.value;
  } else if (expr.type === "word") {
    if (expr.name && expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type === "apply") {
    let { operator, args } = expr;
    if (!operator) {
      throw new SyntaxError("Missing operator in application");
    }
    if (operator.type === "word" && operator.name && operator.name in specialForms) {
      return specialForms[operator.name](args ?? [], scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op === "function") {
        return op(...(args ?? []).map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  } else {
    throw new SyntaxError("Unexpected expression type: " + expr.type);
  }
}

specialForms.if = (args: Expression[], scope: Scope) => {
  if (args.length !== 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args: Expression[], scope: Scope) => {
  if (args.length !== 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }
  return false;
};

specialForms.do = (args: Expression[], scope: Scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args: Expression[], scope: Scope) => {
  if (args.length !== 2 || args[0].type !== "word" || !args[0].name) {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.fun = (args: Expression[], scope: Scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type !== "word" || !expr.name) {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function (...args: any[]) {
    if (args.length !== params.length) {
      throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};

function parse(program: string): Expression {
  const result = parseExpression(program);
  if (skipSpace(result.rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return result.expr;
}

function parseExpression(program: string): { expr: Expression; rest: string } {
  program = skipSpace(program);
  if (!program) {
    throw new SyntaxError("Unexpected end of input");
  }
  let match: RegExpExecArray | null;
  let expr: Expression;
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: "value", value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: "value", value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr: Expression, program: string): { expr: Expression; rest: string } {
  program = skipSpace(program);
  if (!program || program[0] !== "(") {
    return { expr: expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };
  while (program[0] !== ")") {
    let arg = parseExpression(program);
    expr.args!.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function skipSpace(string: string): string {
  let first = string.search(/\S/);
  if (first === -1) return "";
  return string.slice(first);
}

const topScope: Scope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = (value: any) => {
  console.log(value);
  return value;
};

topScope.array = (...values: any[]) => values;
topScope.length = (array: any[]) => array.length;
topScope.element = (array: any[], n: number) => array[n];

export function run(program: string): string {
  const output: string[] = [];
  const customPrint = (value: any) => {
    output.push(String(value));
    return value;
  };
  const customScope = { ...topScope, print: customPrint };
  try {
    evaluate(parse(program), customScope);
  } catch (error: unknown) {
    output.push(`Error: ${(error as Error).message}`);
  }
  return output.join("\n");
}
