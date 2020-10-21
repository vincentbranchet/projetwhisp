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

                events[this.__sheetName].map(event => this.create(event.id, event.name, event.delay, event.required, event.toDelete, event.toSpawn));
                
                resolve();
            })

            .fail(() => reject(new Error("getJSON error : could\'nt load " + this.__fileName)));
        });
    }

    create(id, name, delay, required, toDelete, toSpawn) {
        let event = new NativeEvent(id, name, delay);

        if(required) {
            event.fillRequired(required);
        }

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
            if(evt.id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get nativeEvents() {
        return this.__nativeEvents;
    }
}