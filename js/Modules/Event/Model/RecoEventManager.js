class RecoEventManager extends EventManagerChild {
    constructor(manager) {
        super(manager);

        this.__recoEvents = [];
    }

    init() {
        // get from json

        //
        this.create(1, "Relooking", 10, 2);
        this.__recoEvents[0].addToDelete(1);
        this.__recoEvents[0].addToSpawn(6);

        this.create(2, "Reconversion", 15, 3);
        this.__recoEvents[1].addToSpawn(7);

        this.create(3, "Fête", 12, 4);

        this.create(4, "Influence", 10, 5);
    }

    create(id, name, delay, recoId) {
        this.__recoEvents.push(new RecoEvent(id, name, delay, recoId));
    }

    getFromId(evtId) {
        let targetEvt;
        this.__recoEvents.forEach(evt => {
            if(evt.__id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get recoEvents() {
        return this.__recoEvents;
    }
}