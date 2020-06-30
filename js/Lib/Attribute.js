class Attribute {
    constructor(id, name, value) {
        this.__id = id; // int
        this.__name = name; // string
        this.__value = value; // int
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
}