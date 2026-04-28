console.log("Chapter 6, Exercise 1: Vec class")

class Vec {
    x: number
    y: number
    #length: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.#length = Math.sqrt(x*x + y*y)
    }

    plus(other: Vec) {
        return new Vec(this.x + other.x, this.y + other.y)
    }

    minus(other: Vec) {
        return new Vec(this.x - other.x, this.y - other.y)
    }
    
    get length() {
        return this.#length
    }

    toString() {
        return `Vec(${this.x}, ${this.y})`
    }
}

let vec1 = new Vec(10,2)
let vec2 = new Vec(5,3)

console.log(`First vec: ${vec1}`)
console.log(`Second vec: ${vec2}`)
console.log(`vec1 + vec2: ${vec1.plus(vec2)}`)
console.log(`vec1 - vec2: ${vec1.minus(vec2)}`)
console.log(`vec2 - vec1: ${vec2.minus(vec1)}`)

