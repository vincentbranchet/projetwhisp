class NativeEventManager extends EventManagerChild {
    constructor(manager) {
        super(manager);

        this.__nativeEvents = [];
    }

    init() {
        // get all native events
        this.create(1, "Devenir riche", 5, 2);
        this.__nativeEvents[0].addToSpawn(4);
    }

    create(id, name, delay, attId) {
        this.__nativeEvents.push(new NativeEvent(id, name, delay, attId));
    }

    getFromId(evtId) {
        let targetEvt;
        this.__nativeEvents.forEach(evt => {
            if(evt.__id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get nativeEvents() {
        return this.__nativeEvents;
    }
}