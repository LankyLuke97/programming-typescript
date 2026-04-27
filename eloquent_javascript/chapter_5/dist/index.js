"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Chapter 5, Exercise 1: Flattening");
const flatten = (arr) => {
    let flattened = [];
    for (let sub of arr) {
        flattened = flattened.concat(sub);
    }
    return flattened;
};
let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(`Flattening [[1,2,3],[4,5,6],[7,8,9]] gives ${flatten(nested)}`);
console.log("Chapter 5, Exercise 2: Custom Loop");
const loop = (value, test, update, body) => {
    while (test(value)) {
        body(value);
        value = update(value);
    }
};
console.log("Testing custom for loop");
loop(10, x => { return x > 0; }, x => { return x - 1; }, x => console.log(`Custom looping against ${x}`));
console.log("Chapter 5, Exercise 3: Everything");
const every = (arr, test) => {
    for (let elem of arr) {
        if (!(test(elem)))
            return false;
    }
    return true;
};
const everySome = (arr, test) => !arr.some(x => !test(x));
let all_even = [2, 4, 6, 8];
let some_odd = [2, 3, 4, 5];
console.log(`Is all_even all even using every? ${every(all_even, x => x % 2 === 0)}`);
console.log(`Is all_even all even using everySome? ${everySome(all_even, x => x % 2 === 0)}`);
console.log(`Is some_odd all even using every? ${every(some_odd, x => x % 2 === 0)}`);
console.log(`Is some_odd all even using everySome? ${everySome(some_odd, x => x % 2 === 0)}`);
//# sourceMappingURL=index.js.map