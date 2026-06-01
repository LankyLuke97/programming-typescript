// The task here was to add the third type overload,
// so I've not worried about the Reservation type or
// the functionality of the function.
type Reservation = boolean;

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
    (destination: string): Reservation
}

let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    if (typeof fromOrDestination === 'string') {
        // Book trip without dates
    } else if (toOrDestination instanceof Date && destination !== undefined) {
        // Book a one-way trip
    } else if (typeof toOrDestination === 'string') {
        // Book a round trip
    }
    return true;
}

// Here, the task is to ensure this 'call' function
// only works for functions whose second argument is
// a string and fails at compile time otherwise.
function call<A1, Rest extends unknown[], R>(
    f: (arg1: A1, arg2: string, ...args: Rest) => R,
    arg1: A1,
    arg2: string,
    ...args: Rest
): R {
    return f(arg1, arg2, ...args)
}

function passes(a1: number, a2: string, a3?: { first: string }[]): boolean {
    if (a2) return true;
    return false;
}

function fails(a1: string, a2: number, a3?: { first: string }[]): boolean {
    if (a2) return true;
    return false;
}

call(passes, 2, 'test', [{ first: 'hello' }]);
call(fails, 'test', 2, [{ first: 'hello' }]);

