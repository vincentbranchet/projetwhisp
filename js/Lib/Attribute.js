class Attribute {
    constructor(id, name, value = 0, eventId, isMult = 0, multRate = 0) {
        this.__id = id; // int
        this.__name = name; // string
        this.__value = value; // int
        this.__eventId = eventId; // 0 : no native event, 1 or more = native event id
        this.__isMult = isMult; // boolean
        this.__multRate = multRate;
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
    get eventId() {
        return this.__eventId;
    }
    get isMult() {
        return this.__isMult;
    }
    get multRate() {
        return this.__multRate;
    }
}