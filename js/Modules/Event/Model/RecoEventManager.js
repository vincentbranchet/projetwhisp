class RecoEventManager extends EventManagerChild {
    constructor(manager) {
        super(manager);

        this.__fileName = "reco_events";
        this.__sheetName = "reco_events";

        this.__recoEvents = [];
    }

    init() {

        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', events => {

                events[this.__sheetName].map(event => this.create(event.id, event.name, event.delay, event.recoId, event.newsId, event.toDelete, event.toSpawn, event.isClosure));

                resolve();
            })

            .fail(() => reject(new Error("getJSON error : could\'nt load " + this.__fileName)));
        });
    }

    create(id, name, delay, recoId, newsId, toDelete, toSpawn, isClosure) {
        let recoEvent = new RecoEvent(id, name, delay, recoId, newsId, isClosure);

        if(toDelete) {
            recoEvent.addToDelete(toDelete);
        }

        if(toSpawn) {
            recoEvent.addToSpawn(toSpawn);
        }

        this.__recoEvents.push(recoEvent);
    }

    getFromId(evtId) {
        let targetEvt;
        this.__recoEvents.forEach(evt => {
            if(evt.id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get recoEvents() {
        return this.__recoEvents;
    }
}