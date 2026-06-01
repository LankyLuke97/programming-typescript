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
