class GameEvent {
    constructor(id, name, delay) {
        this.__id = id; // int
        this.__name = name; // string
        this.__delay = delay; // sec (same as timer.duration)
        this.__timer = new Timer();
        this.__toDelete = []; // attribute id
        this.__toSpawn = []; // attribute id
        this.__hasLaunched = 0;
        this.__wasResolved = 0;
    }

    addToDelete(...attributes) {
        attributes.forEach(att => {
            this.__toDelete.push(att);
        });
    }
    addToSpawn(...attributes) {
        attributes.forEach(att => {
            this.__toSpawn.push(att);
        });
    }

    set hasLaunched(bool) {
        this.__hasLaunched = bool;
    }
    set wasResolved(bool) {
        this.__wasResolved = bool;
    }

    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get delay() {
        return this.__delay;
    }
    get timer() {
        return this.__timer;
    }
    get toDelete() {
        return this.__toDelete;
    }
    get toSpawn() {
        return this.__toSpawn;
    }
    get hasLaunched() {
        return this.__hasLaunched;
    }
    get wasResolved() {
        return this.__wasResolved;
    }
}