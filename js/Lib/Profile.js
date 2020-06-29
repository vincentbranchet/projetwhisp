class Profile {
    constructor(id, name, value) {
        this.__id = id;
        this.__name = name;
        this.__value = value;
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