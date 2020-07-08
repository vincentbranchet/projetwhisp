class Reco {
    constructor(id, name, desc, cld, evtId) {
        this.__id = id;
        this.__name = name;
        this.__desc = desc;
        this.__cld = cld;
        this.__evtId = evtId; // id of consequence event
        this.__isActive = 0;
        this.__required = []; // att ids required to show reco
        this.__forbidden = []; // att ids forbidden for reco to show
    }

    fillRequired(...ids) {
        var self = this;

        ids.forEach(id => {
            self.__required.push(id);
        });
    }

    fillForbidden(...ids) {
        var self = this;

        ids.forEach(id => {

            self.__forbidden.push(id);
        });
    }

    get required() {
        return this.__required;
    }
    get forbidden() {
        return this.__forbidden;
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get desc() {
        return this.__desc;
    }
    get cld() {
        return this.__cld;
    }
    get evtId() {
        return this.__evtId;
    }
}