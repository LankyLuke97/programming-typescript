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

type Robot = (state: VillageState, ...args: unknown[]) => {direction: string, memory?: unknown}

function runRobot(state: VillageState, robot: Robot, memory?: unknown) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomRobot(state: VillageState) {
    return {direction: randomPick(roadGraph[state.place])}
}

runRobot(VillageState.random(), randomRobot);
