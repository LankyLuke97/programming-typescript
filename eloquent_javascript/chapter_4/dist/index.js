"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Chapter 4, Exercise 1: Sum of a Range");
const range = (start, end, step = 1) => {
    let arr = [];
    if (step < 0) {
        for (; start >= end; start += step) {
            arr.push(start);
        }
        return arr;
    }
    for (; start <= end; start += step) {
        arr.push(start);
    }
    return arr;
};
const sum = (arr) => {
    let total = 0;
    for (let n of arr)
        total += n;
    return total;
};
console.log(`The sum of the range from 1 to 10 inclusive is ${sum(range(1, 10))}`);
console.log(`The range from 1 to 10, stepping 2, is ${range(1, 10, 2)}`);
console.log(`The range from 5 to 2, stepping -1, is ${range(5, 2, -1)}`);
console.log("Chapter 4, Exercise 2: Reversing an Array");
const reverseArray = (arr) => {
    let rev = [];
    // Could use unshift here, but I suspect that's slower with the way memory works
    // At least, I would expect it to be slower in Python
    for (let i of range(arr.length - 1, 0, -1)) {
        rev.push(arr[i]);
    }
    return rev;
};
const reverseArrayInPlace = (arr) => {
    // Could use unshift here, but I suspect that's slower with the way memory works
    // At least, I would expect it to be slower in Python
    for (let l = 0, r = arr.length - 1; l < r; l++, r--) {
        [arr[l], arr[r]] = [arr[r], arr[l]];
    }
    return arr;
};
let test_arr = range(12, 25);
console.log(`Reversing array returning a new value is ${reverseArray(test_arr)}`);
reverseArrayInPlace(test_arr);
console.log(`And after reversing in-place, it is also ${test_arr}`);
console.log("Chapter 4, Exercise 3: Deep Equal");
const deepEqual = (obj1, obj2) => {
    if (typeof obj1 !== typeof obj2)
        return false;
    if (obj1 === null)
        return obj2 === null;
    if (typeof obj1 !== 'object')
        return obj1 === obj2;
    const k1 = Object.keys(obj1);
    const k2 = Object.keys(obj2);
    if (k1.length != k2.length)
        return false;
    const s1 = new Set(k1);
    for (let k of k2) {
        if (!(s1.has(k) && deepEqual(obj1[k], obj2[k])))
            return false;
    }
    return true;
};
let test_arr1 = [1, 2, 3, 4, 5, 6, 7];
let test_arr2 = [1, 3, 2, 5, 4, 7, 6];
let test_obj1 = {
    'test_str': 'hello',
    'my_num': 3,
    'arr': test_arr1,
    'nested_obj': {
        'just_one': 'nested_key'
    }
};
let test_obj2 = {
    'test_str': 'hello',
    'arr': test_arr1,
    'nested_obj': {
        'just_one': 'nested_key'
    }
};
let test_obj3 = {
    'test_str': 'hello',
    'my_num': 3,
    'arr': test_arr2,
    'nested_obj': {
        'just_one': 'nested_key'
    }
};
let test_obj4 = {
    'test_str': 'hello',
    'my_num': 3,
    'arr': test_arr1,
    'nested_obj': {
        'just_one': 'nested_key',
        'whoops_here_is': 'another_one'
    }
};
console.log('DeepEqual testing:');
console.log(`1 and 2: ${deepEqual(1, 2)}`);
console.log(`'2' and '2': ${deepEqual('2', '2')}`);
console.log(`${test_arr1} against itself: ${deepEqual(test_arr1, test_arr1)}`);
console.log(`Now against ${test_arr2}: ${deepEqual(test_arr1, test_arr2)}`);
console.log("Selection of objects, the first of which are the same and should compare equal, and the rest of which should fail");
console.log(deepEqual(test_obj1, test_obj1));
console.log(deepEqual(test_obj1, test_obj2));
console.log(deepEqual(test_obj1, test_obj3));
console.log(deepEqual(test_obj1, test_obj4));
//# sourceMappingURL=index.js.map