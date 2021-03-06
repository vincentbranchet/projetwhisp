class Profile {
    constructor(id, name) {
        this.__id = id;
        this.__name = name;
        this.__attributes = [];
        this.__value = 0;
        this.__nativeEvents = []; // native events history
        this.__recoEvents = []; // reco events history
        this.__macroEvents = []; // macro events history
        this.__launchedReco = []; // currently running unsolved reco events
        this.__launchedNative = [];
        this.__isClosed = 0; // deactivated state after closure recommandation
    }

    init(...attIds) {
        var self = this;
        
        if(attIds[0]) {
            for(let i = 0; i < attIds[0].length; i++) {
                self.__attributes.push(attIds[0][i]);
            }
        }
    }

    addAttribute(att) {
        if(att instanceof Attribute) {
            this.__attributes.push(att);
        }
    }

    deleteAttribute(att) {
        if(att instanceof Attribute) {
            this.__attributes.push(att);
        }
    }

    addNativeEvent(evt) {
        if(evt instanceof NativeEvent) {
            this.__nativeEvents.push(evt);
        }
    }

    addRecoEvent(evt) {
        if(evt instanceof RecoEvent) {
            this.__recoEvents.push(evt);
        }
    }

    addMacroEvent(evt) {
        if(evt instanceof MacroEvent) {
            this.__macroEvents.push(evt);
        }
    }

    set value(newValue) {
        this.__value = newValue;
    }
    set isClosed(bool) {
        this.__isClosed = bool;
    }

    get attributes() {
        return this.__attributes;
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get value() {
        return this.__value;
    }
    get nativeEvents() {
        return this.__nativeEvents;
    }
    get recoEvents() {
        return this.__recoEvents;
    }
    get macroEvents() {
        return this.__macroEvents;
    }
    get launchedReco() {
        return this.__launchedReco;
    }
    get launchedNative() {
        return this.__launchedNative;
    }
    get isClosed() {
        return this.__isClosed;
    }
}