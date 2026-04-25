"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Chapter 2, exercise 1: Looping a Triangle");
let out = '';
for (let i = 0; i < 7; i++) {
    out += '#';
    console.log(out);
}
console.log("Chapter 2, exercise 2: FizzBuzz");
for (let i = 1; i <= 100; i++) {
    let out = '';
    if (i % 3 === 0)
        out += 'Fizz';
    if (i % 5 === 0)
        out += 'Buzz';
    if (!out)
        console.log(i);
    else
        console.log(out);
}
console.log("Chapter 2, exercise 3: Chessboard");
out = '';
let offset = 0;
let size = 8;
for (let i = 0; i < (size * size); i++) {
    if ((i + offset) % 2)
        out += '#';
    else
        out += ' ';
    if (!(i % size)) {
        out += '\n';
        offset = 1 - offset;
    }
}
console.log(out);
//# sourceMappingURL=index.js.map