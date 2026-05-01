const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House", 
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",    
    "Grete's House-Shop",
    "Marketplace-Post Office",
    "Marketplace-Town Hall",
    "Marketplace-Farm",
    "Marketplace-Shop",
    "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function buildGraph(edges: [string, ...string[]]) {
    let graph = Object.create(null);
    function addEdge(from: string, to: string) {
        if (from in graph) graph[from].push(to);
        else graph[from] = [to];
    }
    for (let [from, to] of edges.map(r => r.split('-'))) {
        if (from && to) {
            addEdge(from,to);
            addEdge(to,from);
        }
    }
    return graph;
}

function randomPick(array: [string, ...string[]]): string {
    return array[Math.floor(Math.random() * array.length)]!;
}

const roadGraph = buildGraph(roads as [string, ...string[]])

class Parcel {
    place: string
    address: string
    
    constructor(place: string, address: string) {
        this.place = place
        this.address = address
    }
}

class VillageState {
    place: string;
    parcels: Parcel[];

    constructor(place: string, parcels: Parcel[]) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination: string) {
        if (!roadGraph[this.place].includes(destination)) return this;
        let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {place: destination, address: p.address}
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
    }

    static random(parcelCount: number = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph) as [string, ...string[]]);
            let place: string;
            do {
                place = randomPick(Object.keys(roadGraph) as [string, ...string[]]);
            } while (place === address);
            parcels.push(new Parcel(place, address));
        }
        return new VillageState("Post Office", parcels);
    }
}

function findRoute(graph: Record<string, string[]>, from: string, to: string) {
    let work: {at: string, route: string[]}[] = [{at: from, route: []}];

    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i]!;
        for (let place of graph[at]!) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
    return []
}

type Robot = (state: VillageState, memory: string[]) => {direction: string, memory?: string[]}

function runRobot(state: VillageState, robot: Robot, memory: string[] = []) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            return turn;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory ?? memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomRobot(state: VillageState) {
    return {direction: randomPick(roadGraph[state.place])}
}

function mailRobot(state: VillageState, memory: string[] = []) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return {direction: memory[0]!, memory: memory.slice(1)}
}

function goalOrientedRobot(state: VillageState, route: string[]) {
    if (route.length === 0) {
        let parcel = state.parcels[0]!
        if (parcel.place != state.place) {
            route = findRoute(roadGraph, state.place, parcel.place)
        } else {
            route = findRoute(roadGraph, state.place, parcel.address)
        }
    }

    return {direction: route[0]!, memory: route.slice(1)}
}

function measureRobots(robot1: Robot, robot2: Robot, iterations: number = 100) {
    let turns1: number = 0, turns2: number = 0;
    for(let i = 0; i < iterations; i++) {
        let state = VillageState.random()
        turns1 += runRobot(state, robot1);
        turns2 += runRobot(state, robot2);
    }
    console.log(`${robot1.name} took ${turns1 / iterations} turns on average to deliver all the parcels.`)
    console.log(`${robot2.name} took ${turns2 / iterations} turns on average to deliver all the parcels.`)
}

runRobot(VillageState.random(), randomRobot);
runRobot(VillageState.random(), mailRobot);
runRobot(VillageState.random(), goalOrientedRobot);

measureRobots(randomRobot, goalOrientedRobot);




const SECRET_KEY = Symbol('private')
class PGroup {
    #stored: any[]
    static #empty: PGroup | undefined

    constructor(key: Symbol, data: any[] = []) {
        if (key !== SECRET_KEY) {
            throw new Error("Cannot create new PGroup. Use PGroup.empty instead");
        }
        this.#stored = data
    }

    static get empty() {
        if (!PGroup.#empty) {
            PGroup.#empty = new PGroup(SECRET_KEY);
        }
        return PGroup.#empty;
    }

    add(value: any) {
        for(let s of this.#stored) {
            if (s === value) return this;
        }
        return new PGroup(SECRET_KEY, this.#stored.concat(value));
    }

    delete(value: any) {
        for (let i = 0; i < this.#stored.length; i++) {
            if (this.#stored[i] === value) {
                return new PGroup(SECRET_KEY, this.#stored.slice(0,i).concat(this.#stored.slice(i+1)));
            }
        }
        return this;
    }

    has(value: any) {
        return this.#stored.some(s => s === value);
    }

    toString() {
        this.#stored.toString();
    }
}

let pgroup = PGroup.empty
pgroup = pgroup.add(1)
pgroup = pgroup.add('2')
pgroup = pgroup.add(2)
pgroup = pgroup.add(2)
console.log(pgroup.has(2))
pgroup = pgroup.delete('2')
console.log(!pgroup.has('2'))

