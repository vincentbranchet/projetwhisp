class Profile {
    constructor(id, name) {
        this.__id = id;
        this.__name = name;
        this.__attributes = [];
        this.__value = 0;
        this.__nativeEvents = []; // native events history
        this.__recoEvents = []; // reco events history
        this.__macroEvents = []; // macro events history
        this.__launchedEvents = []; // currently running unsolved events
    }

    init(...attributes) {
        var self = this;
        
        for(let att of attributes) {
            self.__attributes.push(att);
        }

        self.refresh();
    }

    refresh() {
        var self = this;
        self.__value = 0;

        this.__attributes.forEach(att => {
            self.__value = self.__value + att.__value;
        });
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
    get launchedEvents() {
        return this.__launchedEvents;
    }
}