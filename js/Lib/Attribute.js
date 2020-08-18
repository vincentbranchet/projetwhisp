class Attribute {
    constructor(id, name, value = 0, isMult = 0, multRate = 1) {
        this.__id = id; // int
        this.__name = name; // string
        this.__value = value; // int
        this.__isMult = isMult; // boolean
        this.__multRate = multRate;
        this.__events = [];
    }

    fillEvents(...ids) {

        if(Array.isArray(ids[0])) {
            for(let i = 0; i < ids[0].length; i++) {
                this.__events.push(ids[0][i]);
            }
        }
        else if(ids[0]) {
            this.__events.push(ids[0]);
        }
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
    get isMult() {
        return this.__isMult;
    }
    get multRate() {
        return this.__multRate;
    }
    get events() {
        return this.__events;
    }
}