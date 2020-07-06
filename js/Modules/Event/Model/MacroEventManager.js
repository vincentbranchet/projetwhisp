class MacroEventManager extends EventManagerChild {
    constructor(manager) {
        super(manager);

        this.__macroEvents = [];
    }

    init() {

        // get all macro events
    }

    create(id, name, delay, newsId) {
        this.__macroEvents.push(new MacroEvent(id, name, delay, newsId));
    }

    getFromId(evtId) {
        let targetEvt;
        this.__macroEvents.forEach(evt => {
            if(evt.__id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get macroEvents() {
        return this.__macroEvents;
    }
}