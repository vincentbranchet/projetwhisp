class EventManagerChild {
    constructor(manager) {
        this.__manager = manager;
    }

    get manager() {
        return this.__manager;
    }
}