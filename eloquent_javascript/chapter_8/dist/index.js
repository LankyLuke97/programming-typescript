"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Chapter 8, Exercise 1: Retry");
class MultiplicatorUnitFailure extends Error {
}
function retry(func) {
    while (true) {
        try {
            return func();
        }
        catch (error) {
            if (!(error instanceof MultiplicatorUnitFailure)) {
                throw error;
            }
        }
    }
}
function primitiveMultiply(x, y) {
    if (Math.random() < 0.2)
        throw new MultiplicatorUnitFailure("Primitive Multiply failed");
    return x * y;
}
console.log(retry(() => primitiveMultiply(2, 10)));
console.log("Chapter 8, Exercise 2: The Locked Box");
const box = new class {
    locked = true;
    #content = [];
    unlock() { this.locked = false; }
    lock() { this.locked = true; }
    get content() {
        if (this.locked)
            throw new Error("Locked!");
        return this.#content;
    }
};
function withBoxUnlocked(func) {
    let relock = box.locked;
    if (box.locked)
        box.unlock();
    try {
        func();
    }
    finally {
        if (relock)
            box.lock();
    }
}
try {
    withBoxUnlocked(() => { throw new Error("Fabricated error"); });
}
catch (error) {
    console.log(box.locked);
}
//# sourceMappingURL=index.js.map