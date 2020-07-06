class Reco {
    constructor(id, name, cld, evtId) {
        this.__id = id;
        this.__name = name;
        this.__cld = cld;
        this.__evtId = evtId; // id of consequence event
        this.__isActive = 0;
        this.__required = []; // att ids required to show reco
    }

    fillRequired(...ids) {
        var self = this;

        ids.forEach(id => {
            self.__required.push(id);
        });
    }

    get required() {
        return this.__required;
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get cld() {
        return this.__cld;
    }
    get evtId() {
        return this.__evtId;
    }
}