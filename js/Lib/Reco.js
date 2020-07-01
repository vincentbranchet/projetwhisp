class Reco {
    constructor(id, name, cld) {
        this.__id = id;
        this.__name = name;
        this.__cld = cld;
        this.__isActive = 0;
        this.__required = []; // att ids required to show reco
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
}