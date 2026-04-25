console.log("Chapter 3, Exercise 1: Minimum")

const minimum = (a: number|string, b: number|string) => {
    if (a < b) return a
    return b
}

console.log(`Minimum of 10 and 2 is ${minimum(10, 2)}`)

console.log("Chapter 3, Exercise 2: Recursive isEven")

const isEven = (n: number) => {
    if (n < 0) n = -n
    if (n === 0) return true
    if (n === 1) return false
    return isEven(n-2)
}

console.log(`50 is ${isEven(50) ? '' : 'not '}even`)
console.log(`75 is ${isEven(75) ? '' : 'not '}even`)
console.log(`-1 is ${isEven(-1) ? '' : 'not '}even`)

console.log("Chapter 3, Exercise 3: Counting B's")

const countChar = (word: string, char: string) => {
    for (var i = 0, count = 0; i < word.length; i++ ) {
        count += (word[i] == char ? 1 : 0)
    }
    return count
}

const countB = (word: string) => countChar(word, 'B')

console.log(`There are ${countB('Billy the Bastard')} B's in the phrase 'Billy the Bastard'`)
