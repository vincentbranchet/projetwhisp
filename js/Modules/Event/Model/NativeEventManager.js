class NativeEventManager extends EventManagerChild {
    constructor(manager) {
        super(manager);

        this.__fileName = "native_events";
        this.__sheetName = "native_events";

        this.__nativeEvents = [];
    }

    init() {

        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', events => {

                events[this.__sheetName].map(event => this.create(event.id, event.name, event.delay, event.attId, event.toDelete, event.toSpawn));
                console.log(this.__nativeEvents);
                resolve();
            })

            .fail(() => reject(new Error("getJSON error : could\'nt load " + this.__fileName)));
        });
    }

    create(id, name, delay, attId, toDelete, toSpawn) {
        let event = new NativeEvent(id, name, delay, attId);

        if(toDelete) {
            event.addToDelete(toDelete);
        }

        if(toSpawn) {
            event.addToSpawn(toSpawn);
        }

        this.__nativeEvents.push(event);
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