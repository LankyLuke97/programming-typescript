"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Eloquent JS, Chapter 12: Programming Language");
function skipSpace(program) {
    let index = program.search(/\S/);
    if (index == -1)
        return "";
    program = program.slice(index);
    let match = program.match(/^#.*\r?\n/);
    if (!match || !(match.length))
        return program;
    return program.slice(match[0].length);
}
function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"])"/.exec(program)) {
        expr = { type: "value", value: match[1] };
    }
    else if (match = /^\d+\b/.exec(program)) {
        expr = { type: "value", value: Number(match[0]) };
    }
    else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = { type: "word", name: match[0] };
    }
    else {
        throw new Error("Incorrect Egg syntax");
    }
    return parseApply(expr, program.slice(match[0].length));
}
function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(")
        return { expr: expr, rest: program };
    program = skipSpace(program.slice(1));
    const applyExpr = {
        type: "apply",
        operator: expr,
        args: []
    };
    while (program[0] != ")") {
        let arg = parseExpression(program);
        applyExpr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",")
            program = skipSpace(program.slice(1));
        else if (program[0] != ")")
            throw new SyntaxError("Expected ',' or ')'");
    }
    return parseApply(applyExpr, program.slice(1));
}
function parse(program) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0)
        throw new SyntaxError("Unexpected text after program");
    return expr;
}
console.log(parse("+(a,10)"));
const specialForms = Object.create(null);
function evaluate(expr, scope) {
    if (expr.type == "value")
        return expr.value;
    if (expr.type == "word") {
        if (!(expr.name in scope))
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        return scope[expr.name];
    }
    let { operator, args } = expr;
    if (operator.type == "word" && operator.name in specialForms)
        return specialForms[operator.name](expr.args, scope);
    let op = evaluate(operator, scope);
    if (typeof op == "function")
        return op(...args.map(arg => evaluate(arg, scope)));
    throw new TypeError("Applying a non-function.");
}
// Add keywords to Egg
//
specialForms.if = (args, scope) => {
    if (args.length != 3)
        throw new SyntaxError("Wrong number of args to if");
    const [cond, first, second] = args;
    if (evaluate(cond, scope) !== false)
        return evaluate(first, scope);
    return evaluate(second, scope);
};
specialForms.while = (args, scope) => {
    if (args.length != 2)
        throw new SyntaxError("Wrong number of args to while");
    const [cond, expr] = args;
    while (evaluate(cond, scope) !== false)
        evaluate(expr, scope);
    return false;
};
specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args)
        value = evaluate(arg, scope);
    return value;
};
specialForms.define = (args, scope) => {
    if (args.length != 2)
        throw new SyntaxError("Incorrect use of define");
    const [expr1, expr2] = args;
    if (expr1.type != "word")
        throw new SyntaxError("Incorrect use of define");
    let value = evaluate(expr2, scope);
    scope[expr1.name] = value;
    return value;
};
const topScope = Object.create(null);
topScope.true = true;
topScope.false = false;
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}
topScope.print = (value) => {
    console.log(value);
    return value;
};
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));
function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}
run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1))
           )
        ),
   print(total)
  )
`);
specialForms.fun = (args_param, scope) => {
    if (!args_param.length)
        throw new SyntaxError("Functions need a body");
    let args = args_param;
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word")
            throw new SyntaxError("Parameter names must be words");
        return expr.name;
    });
    return function (...args) {
        if (args.length != params.length)
            throw new TypeError("Wrong number of arguments");
        let localScope = Object.create(scope);
        for (let i = 0; i < args.length; i++)
            localScope[params[i]] = args[i];
        return evaluate(body, localScope);
    };
};
run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10))
  )
`);
run(`
do(define(pow, fun(base, exp,
             if(==(exp, 0),
                1, # this should not interfere
                *(base, pow(base, -(exp, 1))))
               )
             # nor should this
         ),
   print(pow(2, 10))
  )
`);
//# sourceMappingURL=index.js.map