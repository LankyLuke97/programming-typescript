console.log("Eloquent JS, Chapter 12: Programming Language")

type Expression =
  | { type: "value"; value: string|number }
  | { type: "word"; name: string }
  | ApplyExpression;

type ApplyExpression = {
  type: "apply";
  operator: Expression;
  args: Expression[];
};

type ParseResult = {
  expr: Expression;
  rest: string;
};

function skipSpace(program: string) {
    let index = program.search(/\S/)
    if (index == -1) return ""
    return program.slice(index)
}

function parseExpression(program: string): ParseResult {
    program = skipSpace(program)
    let match, expr: Expression;
    if (match = /^"([^"])"/.exec(program)) {
        expr = {type: "value", value: match[1]!};
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0]!)};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = {type: "word", name: match[0]!};
    } else {
        throw new Error("Incorrect Egg syntax");
    }
    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr: Expression, program: string): ParseResult {
    program = skipSpace(program);
    if (program[0] != "(") return {expr: expr, rest: program};

    program = skipSpace(program.slice(1));
    const applyExpr: ApplyExpression = {
            type: "apply",
        operator: expr,
        args: []
    };
    
    while (program[0] != ")") {
        let arg = parseExpression(program);
        applyExpr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") program = skipSpace(program.slice(1));
        else if (program[0] != ")") throw new SyntaxError("Expected ',' or ')'");
    }

    return parseApply(applyExpr, program.slice(1));
}

function parse(program: string): Expression {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) throw new SyntaxError("Unexpected text after program");
    return expr;
}

console.log(parse("+(a,10)"));

