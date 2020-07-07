class GameEventManager {
    constructor() {
        this.__recoManager = new RecoEventManager(this);
        this.__nativeManager = new NativeEventManager(this);
        this.__macroManager = new MacroEventManager(this);

        this.__resolvedEvents = [];
        this.__launchedEvents = [];
    }

    init() {
        this.__recoManager.init();
        this.__nativeManager.init();
    }

    toLaunched(evtId) {
        let event = this.getFromId(evtId);
        this.__launchedEvents.push(event);
    }
    toResolved(evtId) {
        let event = this.getFromId(evtId);
        this.__resolvedEvents.push(event);
    }

    getLaunched(evtId) {
        let targetEvt;
        this.__launchedEvents.forEach(evt => {
            if(evt.__id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    getResolved(id) {
        let targetEvt;
        this.__resolvedEvents.forEach(evt => {
            if(evt.__id == evtId) {
                targetEvt = evt; 
            }                
        });
        return targetEvt;   
    }

    get events() {
        return this.__events;
    }
    get launchedEvents() {
        return this.__launchedEvents;
    }
    get resolvedEvents() {
        return this.__resolvedEvents;
    }
    get recoManager() {
        return this.__recoManager;
    }
    get nativeManager() {
        return this.__nativeManager;
    }
    get macroManager() {
        return this.__macroManager;
    }
}